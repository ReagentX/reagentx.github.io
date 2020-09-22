const Shell = {
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
        $.get(Shell.file, (data) => {
            Shell.text = data;
            Shell.text = Shell.text.slice(0, Shell.text.length - 1);
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
        if (Shell.text)
        {
            const cont = Shell.content();
            if (cont.substring(cont.length - 1, cont.length) === '|')
            {
                $('#console').html($('#console').html().substring(0, cont.length - 1));
            }
            if (key.keyCode !== 8) { Shell.index += Shell.speed; }
            else if (Shell.index > 0) { Shell.index -= Shell.speed; }

            let current_char = Shell.text.substring(Shell.index - 1, Shell.index);
            if (current_char === '%')
            {
                do
                {
                    Shell.index += 1;
                    current_char = Shell.text.substring(Shell.index - 1, Shell.index);
                } while (current_char !== '%');
            }
            let text = Shell.text.substring(0, Shell.index);
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

Shell.speed = 1; // Number of haracters to type at once
Shell.file = 'content/chris.html';
Shell.init();

const timer = setInterval('t();', 30);
function t()
{
    Shell.addText({ keyCode: 123748 });

    if (Shell.index >= Shell.text.length)
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
            html = '<div><h1><span id="a">Blog Posts</span></h1>'
            posts.forEach(post =>
            {
                html += `<p>${post.date} <a href="${post.slug}">${post.title}</a></p>`
            });
            html += '</div>'
            $('#console').html(html)
        });
    } 
    else 
    {
        $.get(content[id], (data) =>
        {
            $('#console').html(data)
        });
    }
}
