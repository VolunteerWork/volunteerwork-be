const DateUtil={
  getWeekDateRange: (n) => {
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
                
    // Calculate the start date of the week
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - currentDayOfWeek + n * 7+1); // Subtract currentDayOfWeek instead of adding
                
    // Calculate the end date of the week
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
                
    return { startDate, endDate }; // You can use object shorthand here
  },
          
  printDate(date){
    if(!date) return "";
    return date.getHours()+":"+date.getMinutes()+","+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
  }
}

export default DateUtil;