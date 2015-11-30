/*
 * Dev Utils Runner
 *
 * Example:
 * npm run util generate component ThreadList
 */

import GenerateComponent from './dev/utils/GenerateComponent.js';

function showError(error) {
	console.log(error);
	process.exit(1);
}

var argv = process.argv.slice(2);

if (!argv[0]) {
	showError('Utils requires arguments.');
};

switch (argv[0]) {

	// Generate
	case 'generate':
	case 'g':
		if (!argv[1]) {
			showError('Generate requires arguments.');
		}
		switch (argv[1]) {
			// Component
			case 'component':
			case 'c':
				if (!argv[2]) {
					showError('Generate Component requires a Component name.');
				}
				GenerateComponent(argv[2]);
				console.log('Done.');
				break;

			// (no match)
			default:
				showError(argv[1] +' is not available');
		}
		break;

	// (no match)
	default:
		showError(argv[0] +' is not available');
}
