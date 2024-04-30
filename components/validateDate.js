export function overDeadline(deadline) {

  let deadlineDate = new Date(deadline);

  let today = new Date();

  deadlineDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return today < deadlineDate;
}