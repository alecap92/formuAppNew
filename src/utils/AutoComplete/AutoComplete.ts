import { Etapa, FormValues } from "../../types/types";

export const handleAutoComplete = async (
  source: "myInfo" | "contacts",
  contact: any,
  user: any,
  datos: { etapas: Etapa[] },
  currentStep: number,
  formValues: FormValues,
  setFormValues: (values: FormValues) => void
) => {
  const updatedValues = { ...formValues };
  const etapaActual = datos.etapas[currentStep];

  if (!etapaActual) {
    return;
  }

  if (source === "myInfo") {
    etapaActual.key.forEach((campo: any) => {
      let fieldValue = null;

      const contactProperty = user.settings.contactProperties.find(
        (prop: any) => prop.key === campo.key
      );

      if (contactProperty && contactProperty.value) {
        fieldValue = contactProperty.value;
      } else {
        fieldValue = user[campo.key];
      }

      if (fieldValue) {
        if (!updatedValues[etapaActual.label]) {
          updatedValues[etapaActual.label] = {};
        }
        updatedValues[etapaActual.label][campo.key] = fieldValue;
      } else {
        console.log(`Campo no encontrado o valor vacío: ${campo.key}`);
      }
    });
  } else if (source === "contacts" && contact) {
    etapaActual.key.forEach((campo) => {
      const contactField = contact.properties.find(
        (prop: any) => prop.key === campo.key
      );

      if (contactField && contactField.value) {
        if (!updatedValues[etapaActual.label]) {
          updatedValues[etapaActual.label] = {};
        }
        updatedValues[etapaActual.label][campo.key] = contactField.value;
      } else {
        console.log(
          `Campo no encontrado o valor vacío en 'Contactos': ${campo.key}`
        );
      }
    });
  }

  setFormValues(updatedValues);
};
