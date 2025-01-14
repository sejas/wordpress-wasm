module.exports = {
	$schema: 'https://typedoc.org/schema.json',
	entryPointStrategy: 'packages',
	entryPoints: [
		'./packages/php-wasm/web',
		'./packages/php-wasm/node',
		'./packages/php-wasm/progress',
		'./packages/playground/client',
	],
	out: './dist/docs',
	intentionallyNotExported: [
		'BasePHP',
		'WithRun',
		'WithRequestHandler',
		'Promisify',
		'WithPathConversion',
		'PHPRequestHeaders',
		'WithProgress',
		'FileInfo',
		'PHPBrowserConfiguration',
	],
	excludeExternals: true,
	customCss: './pages/style.css',
};

if (process.argv.includes('@knodes/typedoc-plugin-pages')) {
	module.exports['pluginPages'] = {
		pages: [
			{
				title: 'Playground',
				children: [
					{
						title: 'Start here',
						source: 'index.md',
					},
					{
						title: 'Embedding WordPress playground-on other websites',
						source: 'public-api/embedding-wordpress-playground-on-other-websites.md',
					},
					{
						title: 'Comparing remote.html and index.html',
						source: 'public-api/index-html-vs-remote-html.md',
					},
					{
						title: 'Using PHP in JavaScript',
						source: 'using-php-in-javascript.md',
					},
					{
						title: 'Using PHP in the browser',
						source: 'using-php-in-the-browser.md',
					},
					{
						title: 'Bundling WordPress for the browser',
						source: 'bundling-wordpress-for-the-browser.md',
					},
					{
						title: 'Running WordPress in the browser',
						source: 'running-wordpress-in-the-browser.md',
					},
					{
						title: 'Service workers',
						source: 'service-worker.md',
					},
					{
						title: 'WordPress plugin IDE',
						source: 'wordpress-plugin-ide.md',
					},
				],
			},
		],
	};
}
