
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = "no-NO"
    return date.toLocaleDateString(locale, {
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric",
    });
  };

  export const formatTime = (dateString: string) => {
    const locale = "no-NO"
    const date = new Date(dateString);
    return date.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  //ChatGPT 
  // har brukt chatGPT for å sikre at at valideringen er tlstrekkelig og at alle visse utfall er gjennomtenkt 
  export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const norwegianPhoneRegex = /^(?:\+47)?[49][0-9]{7}$/;


  export const validatePhoneNumber = (value: string) => {
    const cleanNumber = value.replace(/\s+/g, ''); 
    return norwegianPhoneRegex.test(cleanNumber);
  };

  export const formatPhoneNumberNorwegian = (value: string) => {
    const digitsOnly = value.replace(/\D+/g, '');
  
  
    if (digitsOnly.startsWith('47') && digitsOnly.length > 10) {
      return `+47 ${digitsOnly.slice(2, 5)} ${digitsOnly.slice(5, 7)} ${digitsOnly.slice(7)}`;
    }
  
    if (digitsOnly.length === 8) {
      return `${digitsOnly.slice(0, 3)} ${digitsOnly.slice(3, 5)} ${digitsOnly.slice(5)}`;
    }
  
    if (digitsOnly.length === 8) {
      return `${digitsOnly.slice(0, 2)} ${digitsOnly.slice(2, 4)} ${digitsOnly.slice(4, 6)} ${digitsOnly.slice(6)}`;
    }
  
    return digitsOnly;
  };
  