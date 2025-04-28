    const toDoInput = document.getElementById('todoinput');
    const addButton = document.getElementById('addButton');
    const removeAll = document.getElementById('removeAllButton');
    const listTugas = document.getElementById('list');

    const data = "";
    function simpanData() {
        const items = [];
        for (let i = 0; i < listTugas.children.length; i++) {
            items.push(listTugas.children[i].textContent);
        }

        localStorage.setItem(data, JSON.stringify(items));
    }

    function loadData() {
        const isiData = localStorage.getItem(data);
        if (isiData) {
            const items = JSON.parse(isiData);

            for (let i = 0; i < items.length; i++) {
                const li = document.createElement('li');
                li.textContent = items[i];

                li.addEventListener('click', function() {
                    listTugas.removeChild(li);
                    simpanData();
                });
                li.style.cursor = "pointer";
                listTugas.appendChild(li);
            }
        }
    }

    function tambahTugas() {    
        if (toDoInput.value !== "" ) {
            const li = document.createElement('li');
            li.textContent = toDoInput.value;
            listTugas.appendChild(li);
            toDoInput.value = "";

            li.addEventListener('click', function() {
                    listTugas.removeChild(li);
            })
            li.style.cursor = "pointer";
            simpanData();
        }
    }

    function hapusSemuaTugas() {
        while(listTugas.firstChild) {
            listTugas.removeChild(listTugas.firstChild);
        }
        simpanData();
    }
    loadData();

    addButton.addEventListener('click', tambahTugas);
    removeAll.addEventListener('click', hapusSemuaTugas);
    toDoInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            tambahTugas();
        }
    });