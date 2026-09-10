<?php
declare(strict_types=1);

$destinataire = 'caroloire@sfr.fr';
$telephone = '07 44 73 34 35';

function wants_json(): bool
{
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
    return stripos($accept, 'application/json') !== false;
}

function respond(bool $ok, string $message, string $retour = 'contact'): void
{
    if (wants_json()) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($ok ? 200 : 400);
        echo json_encode(['ok' => $ok, 'erreur' => $ok ? null : $message], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $page = preg_replace('/[^a-z0-9-]/i', '', $retour) ?: 'contact';
    $etat = $ok ? 'envoye' : 'erreur';
    header("Location: /{$page}/?message={$etat}");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Méthode non autorisée.');
}

if (!empty($_POST['_gotcha'] ?? '')) {
    respond(true, 'Message reçu.');
}

$retour = trim((string)($_POST['retour'] ?? 'contact'));
$prenom = trim((string)($_POST['prenom'] ?? ''));
$nom = trim((string)($_POST['nom'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$telephone_client = trim((string)($_POST['telephone'] ?? ''));
$objet = trim((string)($_POST['objet'] ?? 'Demande depuis le site'));
$message = trim((string)($_POST['message'] ?? ''));
$formule = trim((string)($_POST['formule'] ?? ''));
$beneficiaire = trim((string)($_POST['beneficiaire'] ?? ''));
$consentement = trim((string)($_POST['consentement'] ?? ''));

if ($prenom === '' || $nom === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $consentement === '') {
    respond(false, "Merci de vérifier les champs obligatoires.", $retour);
}

if ($message === '' && $formule === '') {
    respond(false, "Merci d'indiquer votre message ou la formule souhaitée.", $retour);
}

$sujet = 'Site Caroline Loire - ' . $objet;
$lignes = [
    'Nouvelle demande envoyée depuis le site Caroline Loire.',
    '',
    'Objet : ' . $objet,
    'Prénom : ' . $prenom,
    'Nom : ' . $nom,
    'E-mail : ' . $email,
    'Téléphone : ' . ($telephone_client !== '' ? $telephone_client : 'Non renseigné'),
];

if ($formule !== '') {
    $lignes[] = 'Formule carte cadeau : ' . $formule;
}

if ($beneficiaire !== '') {
    $lignes[] = 'Bénéficiaire : ' . $beneficiaire;
}

$lignes[] = '';
$lignes[] = 'Message :';
$lignes[] = $message !== '' ? $message : 'Non renseigné';
$lignes[] = '';
$lignes[] = 'Répondre directement à : ' . $email;

$corps = implode("\n", $lignes);
$from = 'no-reply@www.carolineloire-energeticienne.fr';
$headers = [
    'From: Site Caroline Loire <' . $from . '>',
    'Reply-To: ' . $prenom . ' ' . $nom . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$envoye = mail($destinataire, '=?UTF-8?B?' . base64_encode($sujet) . '?=', $corps, implode("\r\n", $headers));

if (!$envoye) {
    respond(false, "L'envoi n'a pas abouti. Vous pouvez appeler ou envoyer un SMS au {$telephone}.", $retour);
}

respond(true, 'Message envoyé.', $retour);
