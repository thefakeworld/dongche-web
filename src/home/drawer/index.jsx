import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { PriceForm } from './search'
import PriceModal from './price-modal'
import { useCarInfo } from './useCarInfo';

export const usePriceDrawer = () => {
    const [state, setState] = useState({ open: false, data: null })
    const showDrawer = (data) => {
        setState({
            open: true,
            data
        });
    };
    const onClose = () => {
        setState({
            open: false,
        });
    };

    return {
        data: state.data,
        open: state.open,
        onClose,
        showDrawer
    }
}

const PriceDrawer = ({ data, ...props }) => {
    const carInfo = useCarInfo(data);
    const [state, setState] = useState({})
    
    // console.log('data', data);
    // console.log('carInfo', carInfo);

    const handleOpen = (values) => {
        setState({
            open: true,
            data: values
        })
    }

    const handleClose = () => {
        console.log('close');
        setState({ open: false })
    }

    return (
        <>
            <PriceModal carInfo={carInfo} onOk={handleClose} onCancel={handleClose} {...state} />
            <Drawer destroyOnClose title="报价" placement="right" {...props}>
                <PriceForm initialValue={data} onSearch={handleOpen} />
            </Drawer>
        </>
    );
};

export default PriceDrawer;