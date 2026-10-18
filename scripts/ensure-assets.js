import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const projectRoot = process.cwd();
const logoPng = path.join(projectRoot, 'src/assets/logo_transparent.png');
const logoJpg = path.join(projectRoot, 'src/assets/logo.jpg');
const profilePng = path.join(projectRoot, 'src/assets/profile.png');
const profileJpg = path.join(projectRoot, 'src/assets/profile.jpg');

function ensureAssets() {
  if (!fs.existsSync(logoPng) && fs.existsSync(logoJpg)) {
    try {
      execSync(
        `convert "${logoJpg}" -bordercolor "#F6FAFB" -border 1 -fuzz 10% -fill none -floodfill +0+0 "#F6FAFB" -shave 1 "${logoPng}"`
      );
      console.log('Generated src/assets/logo_transparent.png');
    } catch {
      fs.copyFileSync(logoJpg, logoPng);
    }
  }

  if (!fs.existsSync(profilePng) && fs.existsSync(profileJpg)) {
    try {
      execSync(`convert "${profileJpg}" "${profilePng}"`);
      console.log('Generated src/assets/profile.png');
    } catch {
      fs.copyFileSync(profileJpg, profilePng);
    }
  }

  // Ensure public copies as well
  const pubLogo = path.join(projectRoot, 'public/logo_transparent.png');
  const pubProfile = path.join(projectRoot, 'public/profile.png');
  if (fs.existsSync(logoPng) && !fs.existsSync(pubLogo)) {
    fs.copyFileSync(logoPng, pubLogo);
  }
  if (fs.existsSync(profilePng) && !fs.existsSync(pubProfile)) {
    fs.copyFileSync(profilePng, pubProfile);
  }
}

ensureAssets();
