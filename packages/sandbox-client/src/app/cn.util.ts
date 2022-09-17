type ClassName = string | boolean | null | undefined;

export const cn = (...classNames: ClassName[]) => {
  return classNames
    .filter((className) => {
      return typeof className === 'string' && !!className.trim();
    })
    .join(' ');
};
