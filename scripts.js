        const images = [];
        for (let i = 1; i <= 227; i++) {
            images.push(`page_${i}.png`);
        }

        let currentPage = 0;

        function updateImage() {
            const pageImage = document.getElementById('page-image');
            pageImage.src = images[currentPage];
            pageImage.alt = `Página ${currentPage + 1}`;
            updateButtons();
            updateActiveLink();
        }

        function updateButtons() {
            document.getElementById('prev-overlay').disabled = currentPage <= 0;
            document.getElementById('next-overlay').disabled = currentPage >= images.length - 1;
        }

        function updateActiveLink() {
            document.querySelectorAll('.menu a').forEach(link => {
                link.classList.remove('active');
            });

            if (currentPage === 0) {
                document.getElementById('link-capa').classList.add('active');
            } else if (currentPage === images.length - 1) {
                document.getElementById('link-ultima').classList.add('active');
            } else {
                const pageLinks = document.querySelectorAll(`.menu a[data-page="${currentPage + 1}"]`);
                if (pageLinks.length > 0) {
                    pageLinks[0].classList.add('active');
                }
            }
        }

        function prevPage() {
            if (currentPage > 0) {
                currentPage--;
                updateImage();
            }
        }

        function nextPage() {
            if (currentPage < images.length - 1) {
                currentPage++;
                updateImage();
            }
        }

        function toggleZoom() {
            const pageImage = document.getElementById('page-image');
            pageImage.classList.toggle('zoomed');
        }

        // Adiciona event listeners para os botões do menu superior
        document.querySelectorAll('.menu a[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageIndex = parseInt(link.getAttribute('data-page'), 10) - 1; // Ajusta para o índice correto
                currentPage = pageIndex;
                updateImage();
            });
        });

        document.getElementById('link-capa').addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = 0; // Vai para a capa
            updateImage();
        });

        document.getElementById('link-ultima').addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = images.length - 1; // Vai para a última página
            updateImage();
        });

        // Controlar abertura e fechamento dos dropdowns
        document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault(); // Evita o comportamento padrão do link
                const dropdownContent = dropdownToggle.nextElementSibling;

                // Fecha todos os outros dropdowns
                document.querySelectorAll('.dropdown-content').forEach(content => {
                    if (content !== dropdownContent) {
                        content.style.display = 'none';
                    }
                });

                // Alterna a visibilidade do dropdown clicado
                if (dropdownContent.style.display === 'block') {
                    dropdownContent.style.display = 'none';
                } else {
                    dropdownContent.style.display = 'block';
                }
            });
        });

        // Fechar dropdowns ao clicar fora deles
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-content').forEach(content => {
                    content.style.display = 'none';
                });
            }
        });

        // Manter a funcionalidade de navegação
        document.querySelectorAll('.dropdown-content a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageIndex = parseInt(link.getAttribute('data-page'), 10) - 1;
                currentPage = pageIndex;
                updateImage();
            });
        });        

        updateImage(); // Inicializa a página