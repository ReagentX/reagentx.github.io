const Typer = {
    text: null,
    accessCountimer: null,
    index: 0,
    speed: 1,
    file: '',
    accessCount: 0,
    deniedCount: 0,
    init()
    {
        // Typer.accessCountimer = setInterval(() => { Typer.updLstChr(); }, 500);
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
        if (Typer.text)
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
            // Typer.updLstChr()
        }
    },

    updLstChr()
    {
        const cont = this.content();
        if (cont.substring(cont.length - 1, cont.length) === '_')
        {
            console.log('adding')
            $('#console').html($('#console').html().substring(0, cont.length - 1));
        }
        else { $('#console').html($('#console').html() += '_') }
    },
};

Typer.speed = 1; // Number of haracters to type at once
Typer.file = 'content/chris.html';
Typer.init();
// Typer.addSection()

const timer = setInterval('t();', 30);
function t()
{
    Typer.addText({ keyCode: 123748 });

    if (Typer.text & Typer.index > Typer.text.length)
    {
        clearInterval(timer);
    }
}

const content = 
{
    'terminal': 'content/terminal.html',
    'content': 'content/content.html',
    'blog': 'content/posts.json'
}

const activate = (id) =>
{
    clearInterval(timer);
    buttons = document.getElementsByClassName('button');
    for (const button of buttons) 
    {
        button.classList.remove('active');
    }
    document.getElementById(id).classList.add('active');

    if (id === 'blog') 
    {
        $.getJSON(content[id], function(posts) 
        {
            html = '<div><h1>Blogroll</h1>'
            posts.forEach(post => {
                html += `<p>${post.date} <a href="${post.slug}">${post.title}</a></p>`
            });
            html += '</div>'
            $('#console').html(html)
        });
    } 
    else 
    {
        $.get(content[id], (data) => {
            $('#console').html(data)
        });
    }
}
