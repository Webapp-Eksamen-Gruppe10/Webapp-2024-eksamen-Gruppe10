
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
  

 
  