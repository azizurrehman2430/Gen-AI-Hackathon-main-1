import { useNotification } from "./useNotification";

export type DiagnosisResultType = {
  type: "Success" | "Error";
  response: number[];
};

const useFormDiagnosis = () => {
  const { NotificationHandler } = useNotification();

  // Convert yes/no to 1/0 and numbers to numeric type
  const normalizeData = (dataArray: any[]) => {
    return dataArray.map((item) => {
      if (typeof item === "string") {
        const lower = item.toLowerCase().trim();

        // Convert yes/no
        if (lower === "yes") return 1;
        if (lower === "no") return 0;

        // Convert male/female for asthma dataset if needed
        if (lower === "male") return 1;
        if (lower === "female") return 0;

        // Convert numeric strings
        if (!isNaN(Number(lower))) return Number(lower);

        return item;
      }
      return item;
    });
  };

  const FormDiagnosis = async (diagnosis: string, data: any) => {
    console.log("Before normalization:", data);

    const normalized = normalizeData(data);
    console.log("After normalization:", normalized);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/genaimech/form/${diagnosis}/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: normalized }),
        }
      );

      const responsedata = await response.json();
      console.log(responsedata);

      if (responsedata.type === "Error") {
        NotificationHandler("Form Diagnosis", responsedata.message, "Error");
        return "Error";
      }

      return {
        type: "Success",
        response: responsedata.response[0],
      };
    } catch (err) {
      console.log(err);
      NotificationHandler("Form Diagnosis", "Something went wrong", "Error");
      return {
        type: "Error",
      };
    }
  };

  return { FormDiagnosis };
};

export default useFormDiagnosis;
