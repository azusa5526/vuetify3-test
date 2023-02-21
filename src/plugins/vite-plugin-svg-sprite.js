import fs from 'fs/promises';
import path from 'path';
import cheerio from 'cheerio';
import glob from 'fast-glob';

const spriteId = '__svg_sprite';

function getAllAttributes(node) {
	return (
		node.attributes ||
		Object.keys(node.attribs).map((name) => ({
			name,
			value: node.attribs[name],
		}))
	);
}

function createSymbol(code, id) {
	const markup = cheerio.load(code, { xmlMode: true });
	const svgMarkup = markup('svg');
	const symbolId = id || svgMarkup.find('title').text();
	const attrs = getAllAttributes(svgMarkup.get(0));
	markup('svg').replaceWith('<symbol/>');
	for (const { name, value } of attrs) {
		if (name === 'class' || name === 'xmlns') {
			continue;
		}
		markup('symbol').attr(name, value);
	}
	markup('symbol')
		.attr('id', symbolId)
		.attr('viewBox', svgMarkup.attr('viewBox'))
		.attr('fill', null)
		.attr('width', null)
		.attr('height', null)
		.append(svgMarkup.children());

	return markup.xml('symbol');
}

function createSprite(symbols) {
	return `<svg id="${spriteId}" xmlns="http://www.w3.org/2000/svg" style="display:none;">${symbols.join('')}</svg>`;
}

export default function svgSprite(opt = {}) {
	const virtualModuleId = 'virtual:svg-sprite';
	const resolvedVirtualModuleId = '\0' + virtualModuleId;

	const hotReload = (server) => {
		server.reloadModule(server.moduleGraph.urlToModuleMap.get(resolvedVirtualModuleId));
	};

	return {
		name: 'svg-sprite',
		configureServer(server) {
			server.watcher.add(opt.include);
			server.watcher.on('add', () => {
				hotReload(server);
			});
			server.watcher.on('change', () => {
				hotReload(server);
			});
		},
		resolveId(id) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId;
			}
			return null;
		},
		async load(id) {
			if (id !== resolvedVirtualModuleId) {
				return null;
			}
			const symbols = [];
			for (const filepath of await glob(opt.include + '/**/*.svg')) {
				const ctx = await fs.readFile(filepath);
				const symbolId = path.basename(filepath, '.svg');
				const symbol = createSymbol(ctx, symbolId);
				symbols.push(symbol);
			}

			return `(function injectDocument(sprite) {
        let div = document.createElement('div');
        if (document.getElementById("${spriteId}")) {
          div.innerHTML = sprite;
          document.getElementById("${spriteId}").replaceWith(div.firstChild);
        } else {
          div.innerHTML = sprite;
          document.body.appendChild(div.firstChild);
        }
        div = null;
      })(\`${createSprite(symbols)}\`)`;
		},
	};
}
