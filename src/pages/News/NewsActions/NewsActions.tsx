import React from 'react';
import {useParams} from "react-router-dom";
import {useInput} from "../../../hooks/useInput";
import {newsAPI} from "../../../store/services/news";
import ResponseResultModal from "../../../components/Modals/ResponseResultModal/ResponseResultModal";
import LayoutActionRecord from "../../../Layouts/LayoutActionRecord/LayoutActionRecord";
import Input from "../../../UI/Input/Input";

import {Button} from "react-bootstrap";
import Textarea from "../../../UI/Textarea/Textarea";
import InputDate from "../../../UI/InputDate/InputDate";
import MDEditor from '@uiw/react-md-editor';

const NewsActions: React.FC = () => {
    const {id} = useParams();
    
    const [newsTrigger, newsResult] = newsAPI.useLazyGetOneNewsQuery();
    const [createNews, {isError: createIsError, error: createError, isSuccess: createIsSuccess}] = newsAPI.useCreateNewsMutation();
    const [updateNews, {isError: updateIsError, error: updateError, isSuccess: updateIsSuccess}] = newsAPI.useUpdateNewsMutation();
    
    const title = useInput('', {isEmpty: true});
    const sub_title = useInput('', {isEmpty: true});

    const [content, setContent] = React.useState('');
    const [date, setDate] = React.useState('');
    const [image, setImage] = React.useState('');
    const [newImage, setNewImage] = React.useState<File | null>(null);

    const isValid = id ? !title.isValid || !sub_title.isValid || !content || !(!(!image && newImage) || !(image && !newImage)) : !title.isValid || !sub_title.isValid || !content || !date || !newImage

    React.useEffect(() => {
        if(id) {
            newsTrigger(+id);
            if(newsResult.data) {
                const oldDate = new Date(newsResult.data.date);
                const defaultDate = oldDate.toLocaleDateString('en-CA');

                title.onSetValue(newsResult.data.title);
                sub_title.onSetValue(newsResult.data.sub_title);
                // content.onSetValue(newsResult.data.content);
                setContent(newsResult.data.content);
                setDate(defaultDate);
                setImage(newsResult.data.image);
            }
        }

        if (createIsSuccess) {
            title.onReset();
            sub_title.onReset();
            // content.onReset();
            setContent('');
            setDate('');
            setNewImage(null);
        }
        if(updateIsSuccess) {
            setNewImage(null);
        }
    }, [newsResult.data, createIsSuccess, updateIsSuccess]);

    const changeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            if(id) {
                setNewImage(e.target.files[0]);
                setImage('');
            } else {
                setNewImage(e.target.files[0]);
            }
        }
    }

    const actionUserHandler = async () => {
        const formData = new FormData();

        formData.append('title', title.value);
        formData.append('sub_title', sub_title.value);
        // formData.append('content', content.value);
        formData.append('content', content);
        date && formData.append('date', date.toString());
        newImage && formData.append('image', newImage);

        if(id) {
            await updateNews({id: +id, formData});
        } else {
            await createNews(formData);
        }
    }

    return (
        <>
            <ResponseResultModal isSuccess={createIsSuccess} isError={createIsError} error={createError} successMessage='Новость успешно добавлена!' />
            <ResponseResultModal isSuccess={updateIsSuccess} isError={updateIsError} error={updateError} successMessage='Новость успешно обновлена!' />

            <LayoutActionRecord
                title={`${id ? 'Редактирование' : 'Создание'} новости`}
                actionText={`${id ? 'Сохранить' : 'Создать'} новость`}
                action={actionUserHandler}
                isValid={isValid}>
                <>
                    <div>
                        <h3>Заголовок</h3>
                        <Input value={title.value} onChange={(e) => title.onChange(e)} onBlur={(e) => title.onBlur(e)} isDirty={title.isDirty} errors={title.errors} type="text" placeholder='Введите заголовок...' />
                    </div>
                    <div>
                        <h3>Подзаголовок</h3>
                        <Textarea value={sub_title.value} onChange={(e) => sub_title.onChange(e)} onBlur={(e) => sub_title.onBlur(e)} isDirty={sub_title.isDirty} errors={sub_title.errors} type="text" placeholder='Введите подзаголовок...' />
                    </div>
                    <div>
                        <h3>Контент</h3>
                        {/*<Textarea value={content.value} onChange={(e) => content.onChange(e)} onBlur={(e) => content.onBlur(e)} isDirty={content.isDirty} errors={content.errors} type="text" placeholder='Введите заголовок...' />*/}
                        <div className="container">
                            <MDEditor
                                value={content}
                                onChange={(e) => e ? setContent(e) : ''}
                            />
                            {/*<MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap' }} />*/}
                        </div>
                    </div>
                    <div>
                        <h3>Дата</h3>
                        <InputDate defaultValue={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div>
                        <h3>Обложка</h3>
                        {
                            image && (<img src={process.env.REACT_APP_API_URI + image} alt="" /> )
                        }
                        {
                            newImage && ( <img src={URL.createObjectURL(newImage)} alt="" /> )
                        }
                        <Button style={{width: 'fit-content'}}>
                            <label htmlFor="image">
                                {id || newImage ? 'Изменить обложку' : 'Добавить обложку'}
                            </label>
                        </Button>
                        <input
                            id="image"
                            type="file"
                            onChange={(e) => changeImageHandler(e)}
                            style={{display: 'none'}} />
                    </div>
                </>
            </LayoutActionRecord>
        </>
    );
};

export default NewsActions;