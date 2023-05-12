const defineText = ({ fontSize, fontFamily, fontStyle, marginLeft, marginRight, marginTop, marginBottom }) => {

}
console.log(window)

const doc = new jspdf.jsPDF()

doc.text("test content long str", 10, 50)


const pdfDataUri = doc.output('datauristring');
const objectElem = document.createElement('object');
objectElem.setAttribute('data', pdfDataUri);
objectElem.setAttribute('type', 'application/pdf');
objectElem.setAttribute('width', '100%');
objectElem.setAttribute('height', '1000px');

const mainElem = document.querySelector('#root');
console.log('append', mainElem, document.childNodes);
if (mainElem) {
  mainElem.appendChild(objectElem);
}