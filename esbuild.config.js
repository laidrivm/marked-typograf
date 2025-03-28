import esbuild from 'esbuild';

const sharedConfig = {
  entryPoints: ['src/index.js'],
  bundle: true,
  sourcemap: true,
  minify: true,
  external: ['marked, typograf'],
};

function buildAll() {
  try {
    esbuild.build({
      ...sharedConfig,
      format: 'esm',
      outfile: 'lib/index.mjs',
    });

    esbuild.build({
      ...sharedConfig,
      format: 'cjs',
      outfile: 'lib/index.cjs',
    });

    console.log('Build completed successfully!');
  } catch {
    process.exit(1);
  }
}

buildAll();
