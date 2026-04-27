const OUT_DIR = "../docs/vendor";

const MODULES = {
  "@arrow-js/core": "https://esm.sh/@arrow-js/core?bundle",
  "goober": "https://esm.sh/goober?bundle"
};

await Deno.mkdir(OUT_DIR, { recursive: true });

for (const [name, url] of Object.entries(MODULES)) {
  console.log(`Fetching ${name}...`);
  const response = await fetch(url);

  if (!response.ok) {
    console.error(`❌ Failed to fetch ${name}: ${response.statusText}`);
    continue;
  }

  const content = await response.text();

  const filename = `${name.replace('@', '').replace('/', '-')}.js`;
  const dest = `${OUT_DIR}/${filename}`;

  await Deno.writeTextFile(dest, content);

  console.log(`✅ Saved ${name} to ${dest}`);
}
