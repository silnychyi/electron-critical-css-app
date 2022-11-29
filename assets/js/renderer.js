document.addEventListener('DOMContentLoaded', () => {

    const btn = document.querySelector('#generate');
    const url = document.querySelector('#url');
    const result = document.querySelector('#result');
    const copy = document.querySelector('#copy');
    const wait = document.querySelector('#wait');

    btn.addEventListener('click', () => {

        clearErrorInput(url)

        if (url && !isValidUrl(url.value)) {
            return setErrorInput(url)
        }

        resetResult(result, copy, wait);

        ipcRenderer.send('css:generate', {
            url: url.value
        })

    })


    ipcRenderer.on('css:done', (e) => {

        if ('error' in e) {
            result.value = 'error';
        }

        if ('css' in e) {
            result.value = e.css;
        }

        wait.classList.add('hidden');
        result.classList.remove('hidden');
        copy.classList.remove('hidden');

    })


    copy.addEventListener('click', () => {
        navigator.clipboard.writeText(result.value).then(() => {
            copy.innerHTML = 'Coppied !';
        });
    });

});


function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}

function setErrorInput(input) {
    input.classList.add('bg-red-50')
    input.classList.add('border-red-500')
    input.classList.add('text-red-900')
}

function clearErrorInput(input) {
    input.classList.remove('bg-red-50')
    input.classList.remove('border-red-500')
    input.classList.remove('text-red-900')
}

function resetResult(textarea, btn, spinner) {
    textarea.value = '';
    btn.innerHTML = 'Copy';
    spinner.classList.remove('hidden');
    textarea.classList.add('hidden');
    btn.classList.add('hidden');
}