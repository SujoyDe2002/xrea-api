import { Help } from '@mui/icons-material'
import { tooltipIcon } from 'app'
import React from 'react'
import { styled, Tooltip, tooltipClasses } from '@mui/material';
import BrightTooltip from './bright-tooltiip';


const TooltipHelp = ({ title }) => {
    return (
        <BrightTooltip title={title} placement="right" arrow>
            <Help style={tooltipIcon} />
        </BrightTooltip>

    )
}

export default TooltipHelp