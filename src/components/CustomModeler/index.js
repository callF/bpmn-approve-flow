import Modeler from 'bpmn-js/lib/Modeler';
import inherits from 'inherits';
import CustomModele from './custom';

export default function CustomModeler(options) {
  Modeler.call(this, options);
  this.__customElements = [];
}

inherits(CustomModeler, Modeler);
CustomModeler.prototype._modules = [].concat(
  CustomModeler.prototype._modules, [
    CustomModele,
  ],
);
