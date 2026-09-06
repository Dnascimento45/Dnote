export const materias = [
    {
        id: 'matematica',
        titulo: 'Matemática',
        formula: 'e^{i\\pi} + 1 = 0',
        imagem: 'assets/matematica.svg',
        conteudos: [
            { id: 'algebra', nome: 'Álgebra', capitulos: [] },
            { id: 'aritmetica', nome: 'Aritmética', capitulos: [] },
            { id: 'geometria', nome: 'Geometria', capitulos: [] },
            { id: 'calculo', nome: 'Cálculo', capitulos: [] }
        ]
    },
    {
        id: 'fisica',
        titulo: 'Física',
        formula: 'F = ma',
        imagem: 'assets/fisica.svg',
        conteudos: [
            { id: 'mecanica', nome: 'Mecânica', capitulos: [] },
            { id: 'termofisica', nome: 'Termofísica', capitulos: [] },
            { id: 'ondulatoria', nome: 'Ondulatória e Acústica', capitulos: [] },
            { id: 'optica', nome: 'Óptica Geométrica', capitulos: [] },
            { id: 'eletrofisica', nome: 'Eletrofísica', capitulos: [] },
            { id: 'fisica_moderna', nome: 'Física Moderna', capitulos: [] }
        ]
    },
    {
        id: 'portugues',
        titulo: 'Português',
        formula: 'Língua & Literatura',
        imagem: 'assets/portugues.svg',
        conteudos: [
            { id: 'gramatica', nome: 'Gramática e Morfologia', capitulos: [] },
            { id: 'sintaxe', nome: 'Sintaxe', capitulos: [] },
            { id: 'semantica', nome: 'Semântica', capitulos: [] },
            { id: 'ortografia', nome: 'Ortografia e Acentuação', capitulos: [] }
        ]
    },
    {
        id: 'ingles',
        titulo: 'Inglês',
        formula: 'English',
        imagem: 'assets/ingles.svg',
        conteudos: [
            { id: 'grammar', nome: 'Grammar & Structure', capitulos: [] },
            { id: 'reading', nome: 'Reading Comprehension & Vocabulary', capitulos: [] }
        ]
    }
];