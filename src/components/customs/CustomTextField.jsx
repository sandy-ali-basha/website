import { forwardRef } from 'react'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  alignItems: 'flex-start',
  '& .MuiInputLabel-root': {
    transform: 'none',
    lineHeight: 1.154,
    position: 'relative',
    marginBottom: theme.spacing(1),
    fontSize: theme.typography.body2.fontSize,
    color: `${theme.palette.text.primary} !important`,
  },
  '& .MuiInputBase-root': {
    borderRadius: 8,
    backgroundColor: 'transparent !important',
    border: `1px solid rgb(47 43 61 / 22%)`,
    transition: theme.transitions.create(['border-color', 'box-shadow'], {
      duration: theme.transitions.duration.shorter,
    }),
    '&:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error):hover': {
      borderColor: `${theme.palette.text.secondary}`,
    },
    '&:before, &:after': {
      display: 'none',
    },
    '&.MuiInputBase-sizeSmall': {
      borderRadius: 6,
    },
    '&.Mui-error': {
      borderColor: theme.palette.error.main,
    },
    '&.Mui-focused': {
      boxShadow: theme.shadows[2],
      '& .MuiInputBase-input:not(.MuiInputBase-readOnly):not([readonly])::placeholder': {
        transform: 'translateX(4px)',
      },
      '&.MuiInputBase-colorPrimary': {
        borderColor: theme.palette.primary.main,
      },
      '&.MuiInputBase-colorSecondary': {
        borderColor: theme.palette.secondary.main,
      },
      '&.MuiInputBase-colorInfo': {
        borderColor: theme.palette.info.main,
      },
      '&.MuiInputBase-colorSuccess': {
        borderColor: theme.palette.success.main,
      },
      '&.MuiInputBase-colorWarning': {
        borderColor: theme.palette.warning.main,
      },
      '&.MuiInputBase-colorError': {
        borderColor: theme.palette.error.main,
      },
      '&.Mui-error': {
        borderColor: theme.palette.error.main,
      },
    },
    '&.Mui-disabled': {
      backgroundColor: `${theme.palette.action.selected} !important`,
    },
    '& .MuiInputAdornment-root': {
      marginTop: '0 !important',
    },
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.secondary,
    '&:not(textarea)': {
      padding: '15.5px 13px',
    },
    '&:not(textarea).MuiInputBase-inputSizeSmall': {
      padding: '7.5px 13px',
    },
    '&:not(.MuiInputBase-readOnly):not([readonly])::placeholder': {
      transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.shorter,
      }),
    },
    '&.MuiInputBase-inputAdornedStart:not(.MuiAutocomplete-input)': {
      paddingLeft: 0,
    },
    '&.MuiInputBase-inputAdornedEnd:not(.MuiAutocomplete-input)': {
      paddingRight: 0,
    },
  },
  '& .MuiFormHelperText-root': {
    lineHeight: 1.154,
    margin: theme.spacing(1, 0, 0),
    color: theme.palette.text.secondary,
    fontSize: theme.typography.body2.fontSize,
    '&.Mui-error': {
      color: theme.palette.error.main,
    },
  },
  '& .MuiAutocomplete-input': {
    paddingLeft: '6px !important',
    paddingTop: '7.5px !important',
    paddingBottom: '7.5px !important',
    '&.MuiInputBase-inputSizeSmall': {
      paddingLeft: '6px !important',
      paddingTop: '2.5px !important',
      paddingBottom: '2.5px !important',
    },
  },
  '& .MuiAutocomplete-inputRoot': {
    paddingTop: '8px !important',
    paddingLeft: '8px !important',
    paddingBottom: '8px !important',
    '&:not(.MuiInputBase-sizeSmall).MuiInputBase-adornedStart': {
      paddingLeft: '13px !important',
    },
    '&.MuiInputBase-sizeSmall': {
      paddingTop: '5px !important',
      paddingLeft: '5px !important',
      paddingBottom: '5px !important',
      '& .MuiAutocomplete-tag': {
        margin: 2,
        height: 22,
      },
    },
  },
  '& .MuiInputBase-multiline': {
    padding: '15.25px 13px',
    '&.MuiInputBase-sizeSmall': {
      padding: '7.25px 13px',
    },
    '& textarea.MuiInputBase-inputSizeSmall:placeholder-shown': {
      overflowX: 'hidden',
    },
  },
  '& + .react-datepicker__close-icon': {
    top: 11,
    '&:after': {
      fontSize: '1.6rem !important',
    },
  },
}));

const CustomTextField = forwardRef((props, ref) => {
  const { size = 'small', InputLabelProps, ...rest } = props;

  console.log('Props:', props);
  console.log('Theme:', ref.current?.theme); // Check if theme is available

  return (
    <TextFieldStyled
      size={size}
      inputRef={ref}
      {...rest}
      variant="filled"
      InputLabelProps={{ ...InputLabelProps, shrink: true }}
    />
  );
});

export default CustomTextField;
