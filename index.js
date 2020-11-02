const form = document.querySelector('[name="verify"]');
const inputs = form.querySelectorAll('.inputs input');

function handleInput(e) {
	const input = e.target;
	// check for data that was inputted and if there is a next input, focus it
	if(input.nextElementSibling && input.value) {
		input.nextElementSibling.focus();
		input.nextElementSibling.select();
	}
}

function handlePaste(e) {
	const paste = e.clipboardData.getData('text');

	// loop over each input, and populate with the index of that string
	// if the length of the paste is shorter than the number of inputs, simply leave the input fields as is
	inputs.forEach((input, i) => {
		input.value = paste[i] || input.value;
	});

	// if all inputs are filled at once, submit form
	// purposefully will not auto submit if the paste length is greater than the number of input fields
	
	if(paste.length == inputs.length) {
		const submitButton = document.querySelector('form [type="submit"]');
		submitButton.focus();
		setTimeout(() => submitButton.click(), 200);
	}
	// if all inputs are not filled, focus the next input field
	else if(paste.length < inputs.length) {
		inputs[paste.length].focus();
	}
}

function handleKeyup(e) {
	const target = e.target;
	//if backspace was pressed on an input element, focus its preceding sibling (if it exists)
	if(e.keyCode == 8 && target.tagName === 'INPUT' && target.previousElementSibling) {
		//delete the target input's value first before focusing because of when the keydown event triggers
		// target.value = '';
		target.previousElementSibling.focus();
    	target.previousElementSibling.select();
	}
}

inputs[0].addEventListener('paste', handlePaste);

form.addEventListener('input', handleInput);

/* using the keydown event would allow the user to hold backspace to clear multiple inputs, 
 * but fixing that behavior for a single tap is complicated
 */
form.addEventListener('keyup', handleKeyup);
