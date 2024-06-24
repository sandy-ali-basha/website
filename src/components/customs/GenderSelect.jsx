import { Box, FormControl, FormHelperText, MenuItem, Select, Typography } from "@mui/material"
import { useTranslation } from "react-i18next";

const GenderSelect = ({ register, errors }) => {
    const { t } = useTranslation("index")

    return (
        <FormControl fullWidth>
            <Select
                label="Gender"
                {...register('gender')}
                error={errors.gender?.message}
                helperText={errors.gender?.message || ""}
                size="small"
                placeholder="Gender"
            >
                <MenuItem value={'female'}><Box>{t('femail')}</Box></MenuItem>
                <MenuItem value={'male'}><Box>{('male')}</Box></MenuItem>
            </Select>
            <FormHelperText error>{errors.gender?.message}</FormHelperText>
        </FormControl>
    )
}
export default GenderSelect