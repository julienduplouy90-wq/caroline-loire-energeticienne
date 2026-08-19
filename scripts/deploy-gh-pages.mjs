/**
 * Publie le contenu de `dist/` sur la branche `gh-pages`, qui est la source
 * du site GitHub Pages. Le code source reste sur `main`.
 *
 * Usage : npm run deploy   (déclenche `astro build` puis ce script)
 */
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const BRANCH = 'gh-pages';

const git = (...args) =>
  execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim();

if (!existsSync(DIST)) {
  console.error('dist/ est introuvable. Lancez `npm run build` d’abord.');
  process.exit(1);
}

const worktree = mkdtempSync(join(tmpdir(), 'ghpages-'));
const cleanup = () => {
  try {
    execFileSync('git', ['worktree', 'remove', '--force', worktree], { cwd: ROOT, stdio: 'ignore' });
  } catch {
    /* le worktree a déjà été retiré */
  }
  rmSync(worktree, { recursive: true, force: true });
};

try {
  const remoteHasBranch = git('ls-remote', '--heads', 'origin', BRANCH) !== '';
  if (remoteHasBranch) {
    git('fetch', 'origin', `${BRANCH}:refs/remotes/origin/${BRANCH}`);
    execFileSync('git', ['worktree', 'add', '-B', BRANCH, worktree, `origin/${BRANCH}`], {
      cwd: ROOT,
      stdio: 'inherit',
    });
  } else {
    execFileSync('git', ['worktree', 'add', '--orphan', '-b', BRANCH, worktree], {
      cwd: ROOT,
      stdio: 'inherit',
    });
  }

  // On vide le worktree (sauf .git) puis on y recopie le build.
  execFileSync('git', ['rm', '-r', '--quiet', '--ignore-unmatch', '.'], {
    cwd: worktree,
    stdio: 'inherit',
  });
  cpSync(DIST, worktree, { recursive: true });
  writeFileSync(join(worktree, '.nojekyll'), '');

  execFileSync('git', ['add', '-A'], { cwd: worktree, stdio: 'inherit' });
  const staged = execFileSync('git', ['status', '--porcelain'], { cwd: worktree, encoding: 'utf8' });
  if (!staged.trim()) {
    console.log('Aucun changement à publier.');
  } else {
    const sha = git('rev-parse', '--short', 'HEAD');
    execFileSync('git', ['commit', '-m', `Déploiement du site (source ${sha})`], {
      cwd: worktree,
      stdio: 'inherit',
    });
    execFileSync('git', ['push', 'origin', BRANCH], { cwd: worktree, stdio: 'inherit' });
    console.log(`Publié sur la branche ${BRANCH}.`);
  }
} finally {
  cleanup();
}
