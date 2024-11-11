import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNewListContext, selectCards } from '../../contexts/ListContext';
import Button from '../../components/Button';
import { useAdService } from '../../data/AdService';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Subcaption from '../../components/Subcaption';
import Paragraf from '../../components/Paragraf';
import ToolButton from '../../components/ToolButton';
import ContextMenu from '../../components/ContextMenu';
import ContextMenuButton from '../../components/ContextMenuButton';
import { useAppContext } from '../../contexts/AppContext';
import './MyAdsListClient.css';
import { PagedList_withLoad } from '../../hoc/withLoad';
import { busyProcess } from '../../utils/utils';

export default function MyAdsListClient() {
    const [ads, setAds] = useState([]);
    const [page, setPage] = useState(0);
    const [pageMax, setPageMax] = useState(0);
    const [isBusy, setIsBusy] = useState(false);
    const listContext = useNewListContext();
    const adService = useAdService();
    const navigate = useNavigate();
    const appContext = useAppContext();

    const publish = ({ idList }) => {
        busyProcess(isBusy, setIsBusy, () => adService.publish({ idList })
            .then(() => {
                listContext.setSelectMode(false);
                load({ page });
                appContext.showNotification(
                    'Успех',
                    `Объявления опубликованы`,
                    'common'
                );
            })
            .catch((err) => {
                appContext.showNotification(
                    'Ошибка',
                    `Не удалось опубликовать: ${err.message}`,
                    'critical'
                );
            })
        )
    }

    const unpublish = ({ idList }) => {
        busyProcess(isBusy, setIsBusy, () => adService.unpublish({ idList })
            .then(() => {
                listContext.setSelectMode(false);
                load({ page });
                appContext.showNotification(
                    'Успех',
                    `Объявления сняты с публикации`,
                    'common'
                );
            })
            .catch((err) => {
                appContext.showNotification(
                    'Ошибка',
                    `Не удалось снять с публикации: ${err.message}`,
                    'critical'
                );
            })
        )
    }

    const deleteAds = ({ idList }) => {
        busyProcess(isBusy, setIsBusy, () => adService.delete({ idList })
            .then(() => {
                listContext.setSelectMode(false);
                load({ page });
                appContext.showNotification(
                    'Успех',
                    `Объявления удалены`,
                    'common'
                );
            })
            .catch((err) => {
                appContext.showNotification(
                    'Ошибка',
                    `Не удалось удалить объявления: ${err.message}`,
                    'critical'
                );
            })
        )
    }

    const load = ({ page }) => {
        busyProcess(isBusy, setIsBusy, () => {
            setAds([]);
            setPage(page);
            return adService.getMyAds({ page })
                .then((data) => {
                    setAds(data.list);
                    setPageMax(data.totalPages);
                })
                .catch((err) => appContext.showNotification(
                    '',
                    `Не удалось загрузить данные: ${err.message}`,
                    'critical'
                ))
        }
        )
    }

    const handlePageValueChange = (event) => {
        load({ page: event.newValue })
    }

    const hasSelectedAdsWithStatus = (status) => {
        return !!ads.filter((ad) => listContext.selectedCards.has(ad.id) && ad.main.status === status).length;
    }

    useEffect(() => {
        load({ page: 1 });
    }, []);

    return (
        <div className="my-ads-list-client">

            <div className="my-ads-list-client__header">
                <Header level={2}>Мои объявления</Header>
                <Button color="secondary" onClick={() => navigate("/c/ad/new")}>Создать объявление</Button>
            </div>
            <PagedList_withLoad
                listContext={listContext}
                pageMax={pageMax}
                pageValue="1"
                onPageValueChange={handlePageValueChange}
                isBusy={isBusy}
                hasItems={ads.length}
                toolsForSelectedMode={
                    <>
                        <ToolButton 
                            icon="icon-send"
                            text="Опубликовать"
                            onClick={() => publish({ idList: Array.from(listContext.selectedCards) })}
                            disabled={isBusy || !hasSelectedAdsWithStatus("unpublished")} />
                        <ToolButton
                            icon="icon-cross"
                            text="Снять с публикации"
                            onClick={() => unpublish({ idList: Array.from(listContext.selectedCards) })}
                            disabled={isBusy || !hasSelectedAdsWithStatus("published")} />
                        <ToolButton
                            icon="icon-bin"
                            text="Удалить"
                            onClick={() => deleteAds({ idList: Array.from(listContext.selectedCards) })}
                            disabled={isBusy || !listContext.selectedCards.size} />
                    </>
                }>
                {ads && ads.map((ad, _) => 
                    <Card id={ad.id} key={ad.id}>
                        <div className="my-ads-list-client__card-content">
                            <div className="my-ads-list-client__up-content">
                                <img className="my-ads-list-client__ad-avatar" src={ad.main.avatar} />
                                <div className="my-ads-list-client__text-content">
                                    <div className="my-ads-list-client__card-header" onClick={() => !listContext.selectMode && navigate("/c/ad/" + ad.id)}>
                                        <Header level={4}>{ ad.main.header }</Header>
                                    </div>
                                    <Subcaption level={2}>{ `г. ${ad.adress.city}, ${ad.adress.district}` }</Subcaption>
                                    <Header level={4}>{ `${ad.price.value.toLocaleString(undefined, { minimumFractionDigits: 0 }) } ${ad.price.currency}` }</Header>
                                    <Paragraf fontSize="small">{ ad.main.shortDesc }</Paragraf>

                                    <ContextMenu>
                                        <ContextMenuButton text="Выбрать" onClick={() => selectCards(listContext, [ad.id])} />
                                        {ad.main?.status === "published" && 
                                            <ContextMenuButton text="Снять с публикации" onClick={() => unpublish({ idList: [ad.id] })} />
                                        }
                                        {ad.main?.status === "unpublished" && 
                                            <ContextMenuButton text="Опубликовать" onClick={() => publish({ idList: [ad.id] })} />
                                        }
                                    </ContextMenu>
                                </div>
                            </div>
                            {ad.main.status === "published" && 
                                <div className="my-ads-list-client__status-bar" style={{backgroundColor: "var(--primary)"}}>
                                    Обубликовано
                                </div>
                            }
                            {ad.main.status !== "published" && 
                                <div className="my-ads-list-client__status-bar" style={{backgroundColor: "var(--warning)"}}>
                                    Не обубликовано
                                </div>
                            }
                        </div>
                    </Card>
                )}
            </PagedList_withLoad>

        </div>
    )
}
