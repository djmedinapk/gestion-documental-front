export const months = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];

export const currentYear = new Date().getFullYear();

/*export const dataPO = {
    name: "",
    pediment: "",
    year: "",
    month: "",
    productType: "",
    client: { id: 0, name: "" },
    statePO: "old",
    accordionState: "",
    addSourceState: { state: "", nameFolder: "" },
    files: [],
    folders: [
      {
        name: "UVA",
        statePO: "old",
        accordionState: "UVA",
        addSourceState: { state: "", nameFolder: "" },
        files: [
          {
            name: "Dictamen",
            statePO: "old",
            stateRequired: false,
            foldersRepeated:[],
            documentType: {
              id: 7,
              name: "Dictamen",
              description: "",
              regex: "",
              code: "",
              icon: "",
              extensionAllowed: ".pdf",
              lastUpdated: "",
            },
            contentFile: {
              name: "",
              lastModified: 0,
              lastModifiedDate: null,
              size: 0,
              type: "",
            },
          },
          {
            name: "Folio de UVA",
            statePO: "old",
            stateRequired: false,
            foldersRepeated:[],
            documentType: {
              id: 7,
              name: "Folio de UVA",
              description: "",
              regex: "",
              code: "",
              icon: "",
              extensionAllowed: ".pdf",
              lastUpdated: "",
            },
            contentFile: {
              name: "",
              lastModified: 0,
              lastModifiedDate: null,
              size: 0,
              type: "",
            },
          },
        ],
        folders: [
          {
            name: "Evidencias",
            statePO: "old",
            accordionState: "Evidencias",
            addSourceState: { state: "", nameFolder: "" },
            products: [],
            files: [],
            folders: [],
          },
        ],
      },
    ],
  };*/

export const dataPO = {
  name: "",
  nameEdit: "",
  stateEditFolder: false,
  pediment: "",
  idUVAPediment: 0,
  year: "",
  month: "",
  productType: "",
  client: { id: 0, name: "" },
  statePO: "old",
  accordionState: "",
  addSourceState: { state: "", nameFolder: "" },
  files: [],
  folders: [
    {
      name: "Documentos Origen",
      nameEdit: "",
      stateEditFolder: false,
      statePO: "old",
      accordionState: "Documentos Origen",
      addSourceState: { state: "", nameFolder: "" },
      files: [
        {
          name: "Orden de Compra",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Orden de Compra",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Shipping Notice",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Shipping Notice",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".xlsx",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: 'Guia Aerea NO Revalidada "rated"',
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: 'Guia Aerea NO Revalidada "rated"',
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: 'Guia Aerea NO Revalidada "unrated"',
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: 'Guia Aerea NO Revalidada "unrated"',
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Factura Fabricante",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Factura Fabricante",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Packing List Fabricante",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [{ url: "Aduanas" }],
          documentType: {
            id: 0,
            name: "Packing List Fabricante",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: 'Poliza de Seguro "Insurance Policy"',
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: 'Poliza de Seguro "Insurance Policy"',
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Listado de IMEI",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [{ url: "Aduanas" }],
          documentType: {
            id: 0,
            name: "Listado de IMEI",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".xlsx",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
      ],
      folders: [],
    },
    {
      name: "Aduanas",
      nameEdit: "",
      stateEditFolder: false,
      statePO: "old",
      accordionState: "Aduanas",
      addSourceState: { state: "", nameFolder: "" },
      files: [
        {
          name: "DODA",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "DODA",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Pedimento Pagado",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [{ url: "UVA" }],
          documentType: {
            id: 0,
            name: "Pedimento Pagado",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Pedimento Simplificado",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Pedimento Simplificado",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Pedimento Rectificado",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [{ url: "UVA" }],
          documentType: {
            id: 0,
            name: "Pedimento Rectificado",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Factura de Importación",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [{ url: "UVA" }],
          documentType: {
            id: 0,
            name: "Factura de Importación",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Carta UVA",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [{ url: "UVA" }],
          documentType: {
            id: 0,
            name: "Carta UVA",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Folio de UVA",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [{ url: "UVA" }],
          documentType: {
            id: 0,
            name: "Folio de UVA",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Hojas de Calculo",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Hojas de Calculo",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Manifestacion de Valor",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Manifestacion de Valor",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Fletes Pagados",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Fletes Pagados",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Archivo M con numeros de Pedimento",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Archivo M con numeros de Pedimento",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".txt",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Actas",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Actas",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: "*",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
      ],
      folders: [],
    },

    {
      name: "UVA",
      nameEdit: "",
      stateEditFolder: false,
      statePO: "old",
      accordionState: "UVA",
      addSourceState: { state: "", nameFolder: "" },
      files: [
        {
          name: "Dictamen",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Dictamen",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
      ],
      folders: [
        {
          name: "Evidencias",
          nameEdit: "",
          stateEditFolder: false,
          statePO: "old",
          accordionState: "Evidencias",
          addSourceState: { state: "", nameFolder: "" },
          products: [],
          files: [],
          folders: [],
        },
      ],
    },
    {
      name: "VUCEM",
      nameEdit: "",
      stateEditFolder: false,
      statePO: "old",
      accordionState: "VUCEM",
      addSourceState: { state: "", nameFolder: "" },
      files: [
        {
          name: "COVE",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "COVE",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "ACUSE COVE",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "ACUSE COVE",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "E DOC - Guia Aerea",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "E DOC - Guia Aerea",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "E DOC - Acuse Guia Aerea",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "E DOC - Acuse Guia Aerea",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "E DOC - Carta 3.1.8",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "E DOC - Carta 3.1.8",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "E DOC - Acuse Carta 3.1.8",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "E DOC - Acuse Carta 3.1.8",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "E DOC - Folio UVA",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "E DOC - Folio UVA",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "E DOC - Acuse Folio UVA",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "E DOC - Acuse Folio UVA",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "E DOC - Carta UVA",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "E DOC - Carta UVA",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "E DOC - Acuse Carta UVA",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "E DOC - Acuse Carta UVA",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "E DOC - Contrato UVA",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "E DOC - Contrato UVA",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "E DOC - Acuse Contrato UVA",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "E DOC - Acuse Contrato UVA",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "E DOC - Numeros de Serie",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "E DOC - Numeros de Serie",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "E DOC - Acuse Numeros de Serie",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "E DOC - Acuse Numeros de Serie",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "E DOC - Certificado NOM",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "E DOC - Certificado NOM",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "E DOC - Acuse Certificado NOM",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "E DOC - Acuse Certificado NOM",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
      ],
      folders: [],
    },
    {
      name: "Comprobables",
      nameEdit: "",
      stateEditFolder: false,
      statePO: "old",
      accordionState: "Comprobables",
      addSourceState: { state: "", nameFolder: "" },
      files: [
        {
          name: "Factura Agente Aduanal",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Factura Agente Aduanal (pdf)",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Factura Agente Aduanal",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Factura Agente Aduanal (xml)",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".xlsx",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Depositos a Agente Aduanal",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Depositos a Agente Aduanal",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Factura Revalidación",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Factura Revalidación (pdf)",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Factura Revalidación",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Factura Revalidación (xml)",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".xlsx",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Factura Maniobras",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Factura Maniobras (pdf)",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Factura Maniobras",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Factura Maniobras (xml)",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".xlsx",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Factura Almacenaje",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Factura Almacenaje (pdf)",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Factura Almacenaje",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Factura Almacenaje (xml)",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".xlsx",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Factura Transporte",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Factura Transporte (pdf)",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Factura Transporte",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Factura Transporte (xml)",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".xlsx",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Factura Custodia",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Factura Custodia (pdf)",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".pdf",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
        {
          name: "Factura Custodia",
          statePO: "old",
          stateRequired: false,
          foldersRepeated: [],
          documentType: {
            id: 0,
            name: "Factura Custodia (xml)",
            description: "",
            regex: "",
            code: "",
            icon: "",
            extensionAllowed: ".xlsx",
            lastUpdated: "",
          },
          contentFile: {
            name: "",
            lastModified: 0,
            lastModifiedDate: null,
            size: 0,
            type: "",
          },
        },
      ],
      folders: [],
    },
    {
      name: "Previo",
      nameEdit: "",
      stateEditFolder: false,
      statePO: "old",
      accordionState: "Previo",
      addSourceState: { state: "", nameFolder: "" },
      files: [],
      folders: [],
    },
  ],
};
