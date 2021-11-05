const labelDay = (index: number) => {
  switch (index) {
    case 0:
      return 'lunes';
    case 1:
      return 'martes';
    case 2:
      return 'miercoles';
    case 3:
      return 'jueves';
    case 4:
      return 'viernes';
    case 5:
      return 'sabado';
    default:
      return 'domingo';
  }
};

export default labelDay;
