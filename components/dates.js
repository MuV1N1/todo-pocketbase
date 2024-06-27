export default function updatedDate(updateDate){
     const date = new Date(item.updated).toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) + " Uhr";

      return date
}