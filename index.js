import execBuffer, {input as execInput, output as execOutput} from 'exec-buffer';
import isGif from 'is-gif';
import gif2webp from 'gif2webp-bin';
import {isUint8Array} from 'uint8array-extras';

const imageminGif2Webp = function (options = {}) {
	return async input => {
		const isData = isUint8Array(input);

		if (!isData) {
			throw new TypeError('Expected a buffer');
		}

		if (!isGif(input)) {
			return input;
		}

		const args = [];

		if (options.lossy) {
			args.push('-lossy');
		}

		if (options.mixed) {
			args.push('-mixed');
		}

		if (options.quality) {
			args.push('-q', options.quality);
		}

		if (options.method) {
			args.push('-m', options.method);
		}

		if (options.minimize) {
			args.push('-min_size');
		}

		if (options.kmin) {
			args.push('-kmin', options.kmin);
		}

		if (options.kmax) {
			args.push('-kmax', options.kmax);
		}

		if (options.filter) {
			args.push('-f', options.filter);
		}

		if (options.metadata) {
			args.push('-metadata', options.metadata);
		}

		if (options.multiThreading) {
			args.push('-mt');
		}

		args.push('-o', execOutput, execInput);

		return execBuffer({
			input: input,
			bin: gif2webp,
			args,
		}).catch(error => {
			error.message = error.stderr || error.message;
			throw error;
		});
	};
};

export default imageminGif2Webp;
