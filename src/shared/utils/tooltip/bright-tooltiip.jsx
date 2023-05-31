import React from 'react'
import { styled, Tooltip, tooltipClasses } from '@mui/material';
import { smallMessageBox, smallMessageBoxArrow } from 'app';

const BrightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
    [`& .${tooltipClasses.arrow}`]: smallMessageBoxArrow,
    [`& .${tooltipClasses.tooltip}`]: smallMessageBox,
}));

export default BrightTooltip;
