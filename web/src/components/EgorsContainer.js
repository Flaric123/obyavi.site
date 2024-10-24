import Button from './Button';
import CollapseContainer from './CollapseContainer';
import Grid from './Grid';
import Header from './Header';
import PagedList from './PagedList';
import Spliter from './Spliter';
import Subcaption from './Subcaption';
import Paragraf from './Paragraf';
import ToolButton from './ToolButton';
import ToolPanel from './ToolPanel';
import Card from './Card';
import ContextMenu from './ContextMenu';
import ContextMenuButton from './ContextMenuButton';
import React, { useState } from 'react';
import ModalFooter from './ModalFooter';
import { useAppContext } from '../contexts/AppContext';
import { ListContextProvider } from '../contexts/ListContext';

const ContentInsideModalExample = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleClick = (event) => {
        event.preventDefault();
        console.log(inputs);
    }

    return (
        <form>
            <label>Enter your name:
                <input type="text" name="username" value={inputs.username || ""} onChange={handleChange} />
            </label>
            <label>Enter your age:
                <input type="number" name="age" value={inputs.age || ""} onChange={handleChange} />
            </label>
            <ModalFooter>
                <Button onClick={handleClick}>console.log</Button>
                <Button onClick={handleClick}>console.log</Button>
            </ModalFooter>
        </form>
    )
}

const CardFakeContent = () => {
    return (
        <div style={{ width: "100%", height: "200px", backgroundColor: "transparent", borderRadius: "10px" }}>
            <a href='/img/left-arrow-l.png'>Ссылка на /img/left-arrow-l.png</a>
        </div>
    )
}

export default function EgorsContainer({ children, header }) {
    const appContext = useAppContext();

    const listContext = {}; // не использовать useState для хранения контекста, получаемого из события onContextChange

    const handleChooseButtonClick = (event, cardId) => {
        listContext.value.setSelectMode(true);
        listContext.value.setSelectedCards(new Set([cardId]));
    }

    const handleListContextChanged = (event) => {
        listContext.value = event.newValue; // обязательно фиксируем изменение контекста
    }

    return (
        <CollapseContainer header="Блоки Егора">
            <Header level="1">Заголовок 1</Header>
            <Header level="2">Заголовок 2</Header>
            <Header level="3">Заголовок 3</Header>
            <Header level="4">Заголовок 4</Header>
            <Header level="5">Заголовок 5</Header>
            <Header level="5" color="warning">Заголовок 5</Header>
            <Header level="6">Заголовок 6</Header>

            <Spliter />

            <Subcaption>Подзаголовок 1</Subcaption>
            <Subcaption level="2">Подзаголовок 2</Subcaption>
            <Subcaption level="2" color="primary">Подзаголовок 2</Subcaption>

            <Spliter height="50px" />

            <Paragraf>Нормальный текст Нормальный текст Нормальный текст Нормальный текст Нормальный текст
                Нормальный текст Нормальный текст Нормальный текст Нормальный текст Нормальный текст Нормальный текст
                Нормальный текст</Paragraf>
            <Spliter />
            <Paragraf fontSize="small">Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький
                текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст
                Маленький текст Маленький текст Маленький текст</Paragraf>
            <Spliter />
            <Paragraf fontSize="10px" color="accent">Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький
                текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст Маленький текст
                Маленький текст Маленький текст Маленький текст</Paragraf>

            <Spliter />

            <Grid desktopColumns="3" mobileColumns="1">
                <Button onClick={() => console.log(1)}>{"console.log(1)"}</Button>
                <Button color="secondary" onClick={() => console.log(1)}>{"console.log(1)"}</Button>
                <Button color="warning" onClick={() => console.log(1)}>{"console.log(1)"}</Button>
                <Button disabled>Текст</Button>
                <Button color="secondary" disabled>Текст</Button>
                <Button color="warning" disabled>Текст</Button>
            </Grid>

            <Spliter />
            <ToolPanel>
                <ToolButton icon="icon-picture" text="console.log(1)" onClick={() => console.log(1)} />
                <ToolButton icon="icon-cross" text="console.log(1)" onClick={() => console.log(1)} />
                <ToolButton icon="icon-picture" text="console.log(1)" onClick={() => console.log(1)}/>
                <ToolButton icon="icon-cross" text="console.log(1)" onClick={() => console.log(1)}/>
                <ToolButton icon="icon-picture" text="console.log(1)" onClick={() => console.log(1)}/>
                <ToolButton icon="icon-cross" text="console.log(1)" onClick={() => console.log(1)}/>
                <ToolButton icon="icon-picture" text="console.log(1)" onClick={() => console.log(1)}/>
                <ToolButton icon="icon-cross" text="console.log(1)" onClick={() => console.log(1)}/>
                <ToolButton icon="img/left-arrow-l.png" text="console.log(1)" onClick={() => console.log(1)}/>
                <ToolButton icon="none" text="console.log(1)" onClick={() => console.log(1)}/>
                <ToolButton onClick={() => console.log(1)} />
                <ToolButton onClick={() => console.log(1)} />
                <ToolButton onClick={() => console.log(1)} />
            </ToolPanel>

            <Spliter />

            <ListContextProvider onContextChanged={handleListContextChanged}>
                <PagedList
                    pageMax="10"
                    onPageValueChange={(event) => console.log(event)}
                    tools={
                        <ToolButton icon="icon-picture" text="console.log(2)" onClick={() => console.log(2)} />
                    }
                    toolsForSelectedMode={
                        <ToolButton icon="icon-picture" text="console.log(1)" onClick={() => console.log(1)} />
                    }>
                    <Card id={0}>
                        <CardFakeContent />
                        <ContextMenu>
                            <ContextMenuButton text="Выбрать" onClick={(event) => handleChooseButtonClick(event, 0)} />
                            <ContextMenuButton text="Показать отмеченные" onClick={() => console.log(listContext.value.selectedCards)} />
                            <ContextMenuButton text="console.log(2)" onClick={() => console.log(2)} />
                        </ContextMenu>
                    </Card>
                    <Card id={1}>
                        <CardFakeContent />
                        <ContextMenu>
                            <ContextMenuButton text="Выбрать" onClick={(event) => handleChooseButtonClick(event, 1)} />
                            <ContextMenuButton text="console.log(1)" onClick={() => console.log(1)} />
                        </ContextMenu>
                    </Card>
                    <Card id={2}>
                        <CardFakeContent />
                        <ContextMenu>
                            <ContextMenuButton text="Выбрать" onClick={(event) => handleChooseButtonClick(event, 2)} />
                            <ContextMenuButton text="console.log(1)" onClick={() => console.log(1)} />
                        </ContextMenu>
                    </Card>
                </PagedList>
            </ListContextProvider>
            
            <Spliter />

            <Grid desktopColumns="2" mobileColumns="1">
                <Button
                    color="secondary"
                    onClick={() => appContext.showModal(
                        "Модальное окно",
                        (<ContentInsideModalExample />)
                    )}>
                    Модальное окно
                </Button>
                <Button
                    color="secondary"
                    onClick={() => appContext.showModal(
                        "Перегруженное модальное окно",
                        (<div style={{ width: "1000px", height: "1000px", backgroundColor: "transparent" }}></div>)
                    )}>
                    Перегруженное модальное окно
                </Button>
            </Grid>

            <Spliter />

            <Grid desktopColumns="3" mobileColumns="1">
                <Button color="secondary" onClick={() =>
                    appContext.showNotification(
                        'Заголовок уведомления',
                        'Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления',
                        'common',
                        [{ text: "console.log(1)", onClick: () => console.log(1) }]
                    )}>
                    Показать уведомление common
                </Button>
                <Button color="primary" onClick={() =>
                    appContext.showNotification('Заголовок уведомления', 'Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления', 'important', [
                        { text: "console.log(2)", onClick: () => console.log(2) }
                    ])}>
                    Показать уведомление important
                </Button>
                <Button color="warning" onClick={() =>
                    appContext.showNotification('Заголовок уведомления', 'Текст уведомления Текст уведомления Текст уведомления Текст уведомления Текст уведомления', 'critical', [
                        { text: "console.log(3)", onClick: () => console.log(3) }
                    ])}>
                    Показать уведомление warning
                </Button>
            </Grid>

            <Spliter />

        </CollapseContainer>
    );
}