import React, { FC } from 'react';
import { useFocus } from '@flame-ui/utils/src/hooks';
import { Icon, IconWrapper } from './styled';

interface IconChangeMonthProps {
  isFocused: boolean;
  ariaLabel: string;
  icon: JSX.Element;
  onClick: () => void;
}

const IconChangeMonth: FC<IconChangeMonthProps> = ({
  isFocused,
  ariaLabel,
  icon,
  onClick,
}) => {
  const iconRef = useFocus({ isFocused });
  return (
    <IconWrapper
      ref={iconRef}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-hidden={!isFocused}
    >
      <Icon>{icon}</Icon>
    </IconWrapper>
  );
};

export default IconChangeMonth;
