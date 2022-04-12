export const initXmlStr = `
<?xml version="1.0" encoding="UTF-8"?>
<definitions
  xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
  xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
  xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
  xmlns:flowable="http://flowable.org/bpmn"
  xmlns:bioc="http://bpmn.io/schema/bpmn/biocolor/1.0"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns:ns0="undefined" targetNamespace="http://www.flowable.org/processdef">
  <process id="Process_$ProcessId$" name="name_$ProcessNm$" isExecutable="true" />
  <bpmndi:BPMNDiagram id="BpmnDiagram_$ProcessId$">
    <bpmndi:BPMNPlane id="BpmnPlane_$ProcessId$" bpmnElement="Process_$ProcessId$" />
  </bpmndi:BPMNDiagram>
</definitions>
`;

export const getInitXml = (id: string) => {
  return initXmlStr.replace(/\$ProcessId\$/g, id).replace(/\$ProcessNm\$/g, id);
};

export const generateUUID = () => {
  let d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now();
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    /* eslint-disable no-bitwise */
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    // eslint-disable-next-line no-mixed-operators
    return (c === '' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};
