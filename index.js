const section = '<div id="section"><span id="prompt"></span><span id="command"></span></div>';


const Typer = {
    text: null,
    accessCountimer: null,
    index: 0,
    speed: 2,
    file: '',
    accessCount: 0,
    deniedCount: 0,
    init()
    {
        // accessCountimer=setInterval(function(){Typer.updLstChr();},500);
        $.get(Typer.file, (data) => {
            Typer.text = data;
            Typer.text = Typer.text.slice(0, Typer.text.length - 1);
        });
    },

    content()
    {
        return $('#console').html();
    },

    write(str)
    {
        $('#console').append(str);
        return false;
    },

    addSection()
    {
        const d = document.getElementById('console');
        d.innerHTML += section;
    },

    addText(key)
    {
        if (key.keyCode === 18)
        {
            Typer.accessCount += 1;

            if (Typer.accessCount >= 3)
            {
                Typer.makeAccess();
            }
        }

        else if (key.keyCode === 20)
        {
            Typer.deniedCount += 1;

            if (Typer.deniedCount >= 3)
            {
                Typer.makeDenied();
            }
        }

        else if (key.keyCode === 27)
        {
            Typer.hidepop();
        }

        else if (Typer.text)
        {
            const cont = Typer.content();
            if (cont.substring(cont.length - 1, cont.length) === '|')
            {
                $('#console').html($('#console').html().substring(0, cont.length - 1));
            }
            if (key.keyCode !== 8) { Typer.index += Typer.speed; }
            else if (Typer.index > 0) { Typer.index -= Typer.speed; }

            let current_char = Typer.text.substring(Typer.index - 1, Typer.index);
            if (current_char === '%')
            {
                do
                {
                    Typer.index += 1;
                    current_char = Typer.text.substring(Typer.index - 1, Typer.index);
                } while (current_char !== '%');
            }
            let text = Typer.text.substring(0, Typer.index);
            text = text.replace(/%/g, '');
            const rtn = new RegExp('\n', 'g');
            $('#console').html(text.replace(rtn, '<br/>'));
            window.scrollBy(0, 50);
        }

        if (key.preventDefault && key.keyCode !== 122)
        {
            key.preventDefault();
        }

        if (key.keyCode !== 122)
        { // otherway prevent keys default behavior
            key.returnValue = false;
        }
    },

    updLstChr()
    {
        const cont = this.content();

        if (cont.substring(cont.length - 1, cont.length) === '|')
        {
            $('#console').html($('#console').html().substring(0, cont.length - 1));
        }
        else { this.write('|'); } // else write it
    },
};

Typer.speed = 1;  // Number of haracters to type at once
Typer.file = 'chris.html';
Typer.init();
// Typer.addSection()

const timer = setInterval('t();', 25);
function t()
{
    Typer.addText({ keyCode: 123748 });

    if (Typer.index > Typer.text.length)
    {
        clearInterval(timer);
    }
}
