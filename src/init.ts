import { IS_TOUCH_DEVICE } from './utilities/useIsTouchDevice';

if (IS_TOUCH_DEVICE) {
	window.document.body.classList.add('touch');
} else {
	window.document.body.classList.add('no-touch');
}
