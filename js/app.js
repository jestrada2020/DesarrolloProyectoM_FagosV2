document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.content-section');
    const menuItems = document.querySelectorAll('.menu-item');
    const sidebar = document.getElementById('sidebar');

    const facts = [];

    const protocols = {
        muestreo:
            'Rutas de muestreo binacional en cuerpos de agua priorizados, con cadena de frío y metadatos ambientales estandarizados.',
        laboratorio:
            'Purificación de fagos mediante filtrado y cultivo bacteriano, seguida de extracción y cuantificación de ácidos nucleicos.',
        analisis:
            'Secuenciación, ensamblaje y anotación funcional utilizando pipelines reproducibles basados en contenedores y Snakemake.'
    };

    const resultHighlights = {};

    function resizeHierarchyIframe() {
        const iframe = document.getElementById('hierarchy-iframe');
        if (!iframe || !iframe.contentWindow) {
            return;
        }
        try {
            const doc = iframe.contentWindow.document;
            const height = Math.max(
                doc.body ? doc.body.scrollHeight : 0,
                doc.documentElement ? doc.documentElement.scrollHeight : 0
            );
            if (height) {
                iframe.style.height = `${height + 40}px`;
            }
        } catch (error) {
            // no-op
        }
    }

    function setActiveMenu(id) {
        menuItems.forEach((item) => {
            item.classList.toggle('active', item.dataset.section === id);
        });
    }

    function hideSections() {
        sections.forEach((section) => section.classList.remove('active'));
    }

    function showSection(id) {
        hideSections();
        const target = document.getElementById(id);
        if (target) {
            target.classList.add('active');
            setActiveMenu(id);
            if (id === 'jerarquia') {
                resizeHierarchyIframe();
            }
            if (window.innerWidth < 900) {
                sidebar.classList.remove('active');
            }
        }
    }

    function toggleSidebar() {
        sidebar.classList.toggle('active');
    }

    function showRandomFact() {
        const box = document.getElementById('fact-content');
        if (!box || facts.length === 0) {
            return;
        }
        const fact = facts[Math.floor(Math.random() * facts.length)];
        box.textContent = fact;
    }

    function loadProtocol(key) {
        const target = document.getElementById('protocol-content');
        if (!target || !protocols[key]) {
            return;
        }
        target.textContent = protocols[key];
    }

    function highlightResult(key) {
        const target = document.getElementById('result-highlight');
        if (!target || !resultHighlights[key]) {
            return;
        }
        target.textContent = resultHighlights[key];
    }

    window.showSection = showSection;
    window.toggleSidebar = toggleSidebar;
    window.showRandomFact = showRandomFact;
    window.loadProtocol = loadProtocol;
    window.highlightResult = highlightResult;

    const hierarchyIframe = document.getElementById('hierarchy-iframe');
    if (hierarchyIframe) {
        hierarchyIframe.addEventListener('load', () => {
            resizeHierarchyIframe();
        });
    }

    window.addEventListener('resize', () => {
        const hierarchySection = document.getElementById('jerarquia');
        if (hierarchySection && hierarchySection.classList.contains('active')) {
            resizeHierarchyIframe();
        }
    });

    showSection('home');
    showRandomFact();
    loadProtocol('muestreo');
    highlightResult('viabilidad');
});
