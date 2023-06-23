import React from 'react';

import LayoutListRecords from '../../Layouts/LayoutListRecords/LayoutListRecords';
import Record from '../../components/Record/Record';
import { ROUTES } from '../../utils/constants';

const JobOpenings: React.FC = () => {
    const records = [
        {
            id: 1,
            title: 'Frontend dev'
        },
        {
            id: 2,
            title: 'Backend dev'
        },
        {
            id: 3,
            title: 'Full stack dev'
        },
    ]

    const onDeleteHandler = (id: number) => {
        console.log(`delete record ${id}!`);
    }

    return (
        <LayoutListRecords title='Вакансии' buttonLink={ROUTES.JOB_OPENINGS_CREATE_ROUTE} buttonText='Добавить вакансию'>
            <>
                {records.map((item) => (
                    <Record key={item.id} title={item.title} editTo={ROUTES.JOB_OPENINGS_EDIT_ROUTE + '/' + item.id} onDelete={() => onDeleteHandler(item.id)} />
                ))}
            </>
        </LayoutListRecords>
    );
};

export default JobOpenings;