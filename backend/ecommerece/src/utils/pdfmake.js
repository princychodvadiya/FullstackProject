const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');

const fonts = {
    Roboto: {
        normal: path.join(__dirname, '../../public/font/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../../public/font/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../../public/font/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../../public/font/Roboto-MediumItalic.ttf')
    }
};

const printer = new PdfPrinter(fonts);

const exportpdfmake = () => {
    console.log(__dirname);

    const docDefinition = {
        content: [
            { text: 'A simple table with nested elements', style: 'subheader' },
            'It is of course possible to nest any other type of nodes available in pdfmake inside table cells',
            {
                style: 'tableExample',
                table: {
                    body: [
                        ['Column 1', 'Column 2', 'Column 3'],
                        [
                            {
                                stack: [
                                    'Let\'s try an unordered list',
                                    {
                                        ul: [
                                            'item 1',
                                            'item 2'
                                        ]
                                    }
                                ]
                            },
                            [
                                'or a nested table',
                                {
                                    table: {
                                        body: [
                                            ['Col1', 'Col2', 'Col3'],
                                            ['1', '2', '3'],
                                            ['1', '2', '3']
                                        ]
                                    },
                                }
                            ],
                            {
                                text: [
                                    'Inlines can be ',
                                    { text: 'styled\n', italics: true },
                                    { text: 'easily as everywhere else', fontSize: 10 }]
                            }
                        ]
                    ]
                }
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableOpacityExample: {
                margin: [0, 5, 0, 15],
                fillColor: 'blue',
                fillOpacity: 0.3
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        },
        defaultStyle: {
            // alignment: 'justify'
        },
        patterns: {
            stripe45d: {
                boundingBox: [1, 1, 4, 4],
                xStep: 3,
                yStep: 3,
                pattern: '1 w 0 1 m 4 5 l s 2 0 m 5 3 l s'
            }
        }
    };

    const outputPath = path.join(__dirname, "../../../../../fullstackProject/backend/ecommerece/document.pdf");

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(outputPath));
    pdfDoc.end();
}

module.exports = exportpdfmake;
