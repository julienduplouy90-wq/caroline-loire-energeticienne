<?php
/**
 * Formulaire de contact — envoi du message vers la boîte de Caroline.
 *
 * Pourquoi ce fichier existe
 * --------------------------
 * Août 2026 : Caroline ne veut plus voir son adresse e-mail sur le site.
 * Les visiteurs passent donc uniquement par le formulaire, et c'est ce
 * script — exécuté par le serveur, jamais lu par le navigateur — qui
 * connaît l'adresse de destination. Rien à copier pour un visiteur,
 * rien à ramasser pour un robot collecteur d'adresses.
 *
 * L'adresse est écrite en base64 UNIQUEMENT pour qu'elle ne traîne pas en
 * clair dans le dépôt public : ce n'est pas une protection, seulement de
 * l'hygiène. Pour la changer : `echo -n "nouvelle@adresse.fr" | base64`.
 *
 * Ce fichier est déposé tel quel dans public_html par le déploiement Astro
 * (tout ce qui est dans `public/` est recopié dans `dist/`).
 */

declare(strict_types=1);

// Y2Fyb2xvaXJlQHNmci5mcg== → caroloire@sfr.fr
const DESTINATAIRE = 'Y2Fyb2xvaXJlQHNmci5mcg==';

header('X-Content-Type-Options: nosniff');

/**
 * Répond et arrête le script.
 *
 * Avec JavaScript, le formulaire envoie `Accept: application/json` et reste
 * sur la page. Sans JavaScript, le navigateur poste le formulaire « à
 * l'ancienne » : on le renvoie alors sur /contact/ avec un paramètre que la
 * page sait afficher, plutôt que de lui montrer du JSON brut.
 */
function repondre(int $code, array $corps)
{
    $veutJson = strpos((string) ($_SERVER['HTTP_ACCEPT'] ?? ''), 'application/json') !== false;

    if ($veutJson) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($code);
        echo json_encode($corps, JSON_UNESCAPED_UNICODE);
        exit;
    }

    $etat = !empty($corps['ok']) ? 'envoye' : 'erreur';
    header('Location: /contact/?message=' . $etat . '#form-status', true, 303);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    repondre(405, ['ok' => false, 'erreur' => 'Méthode non autorisée.']);
}

/** Retire tout retour à la ligne : empêche l'injection d'en-têtes SMTP. */
function propre(string $valeur, int $max = 200): string
{
    $valeur = str_replace(["\r", "\n", "\0"], ' ', $valeur);
    return trim(mb_substr($valeur, 0, $max));
}

function champ(string $nom, int $max = 200): string
{
    return propre((string) ($_POST[$nom] ?? ''), $max);
}

// Piège à robots : rempli = on répond « ok » sans rien envoyer.
if (champ('_gotcha') !== '') {
    repondre(200, ['ok' => true]);
}

$prenom  = champ('prenom', 80);
$nom     = champ('nom', 80);
$email   = champ('email', 160);
$tel     = champ('telephone', 40);
$objet   = champ('objet', 120) ?: 'Demande d’informations';
$message = trim(str_replace("\0", '', (string) ($_POST['message'] ?? '')));
$message = mb_substr($message, 0, 5000);
$nouvelles = ($_POST['nouvelles'] ?? '') !== '' ? 'oui' : 'non';

if ($prenom === '' || $nom === '' || $message === '') {
    repondre(422, ['ok' => false, 'erreur' => 'Merci de remplir votre nom, votre prénom et votre message.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    repondre(422, ['ok' => false, 'erreur' => 'L’adresse e-mail saisie ne semble pas valide.']);
}
if (($_POST['consentement'] ?? '') === '') {
    repondre(422, ['ok' => false, 'erreur' => 'Merci d’accepter l’utilisation de vos données pour recevoir une réponse.']);
}

$hote = preg_replace('/[^a-z0-9.\-]/i', '', (string) ($_SERVER['HTTP_HOST'] ?? 'localhost'));
$hote = preg_replace('/^www\./i', '', $hote);
$expediteur = 'no-reply@' . $hote;

$destinataire = base64_decode(DESTINATAIRE, true);
if ($destinataire === false || $destinataire === '') {
    repondre(500, ['ok' => false, 'erreur' => 'Configuration du formulaire incomplète.']);
}

$sujet = sprintf('[Site] %s — %s %s', $objet, $prenom, $nom);

$corps = implode("\n", [
    'Nouveau message envoyé depuis le formulaire du site.',
    '',
    'Prénom    : ' . $prenom,
    'Nom       : ' . $nom,
    'E-mail    : ' . $email,
    'Téléphone : ' . ($tel !== '' ? $tel : '—'),
    'Objet     : ' . $objet,
    'Souhaite recevoir des nouvelles : ' . $nouvelles,
    '',
    '--- Message ---',
    $message,
    '',
    '---',
    'Répondre à ce courriel écrit directement à la personne.',
]);

$entetes = implode("\r\n", [
    'From: Site Caroline Loire <' . $expediteur . '>',
    'Reply-To: ' . $prenom . ' ' . $nom . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: site-caroline-loire',
]);

$envoye = @mail(
    $destinataire,
    '=?UTF-8?B?' . base64_encode($sujet) . '?=',
    $corps,
    $entetes,
    '-f' . $expediteur
);

if (!$envoye) {
    repondre(502, ['ok' => false, 'erreur' => 'L’envoi n’a pas abouti.']);
}

repondre(200, ['ok' => true]);
