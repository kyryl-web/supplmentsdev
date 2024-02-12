import { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../header/header';
import ItemList from '../itemList/itemList';
import Categories from '../categories/categories';
import InitFilter from '../initFilter/initFilter';
import QuickMenu from '../quickMenu/quickMenu';
import NightMod from '../nightMod/nightMod';
import WaitSuppList from '../tabs/suppList';
import ItemsTab from '../tabs/itemsTab';
import RecycleBin from '../tabs/recycleBin';

import './App.css';

function App() {
 // {
    //   title: '',
    //   shortTitle: '',
    //   categories: [],
    //   take: [],
    //   pauseDate: '',
    //   lastTakeDate: '',
    //   activePause: false,
    //   pauseDays: 0,
    //   id: 6
  // }
  const [items, setItems] = useState([]);
  const [waitList, setWaitList] = useState(JSON.parse(localStorage.getItem('waitList')) ? JSON.parse(localStorage.getItem('waitList')) : []);
  const [categories, setCategories] = useState([]);
  const [recycleItems, setRecycleItems] = useState([]);
  const [archiveItems, setArchiveItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [initFilter, setInitFilter] = useState('all');
  const [checked, setChecked] = useState(Boolean(localStorage.getItem('night')));
  const [lastCheck, setLastCheck] = useState(localStorage.getItem('lastCheck'));
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('items'))?.length) {
        setItems(JSON.parse(localStorage.getItem('items')));
    }

    if (JSON.parse(localStorage.getItem('waitList'))?.length) {
      setWaitList(JSON.parse(localStorage.getItem('waitList')));
    }

    if (localStorage.getItem('init')) {
      setInitFilter(localStorage.getItem('init'));
    }

    if (localStorage.getItem('night') === '' || localStorage.getItem('night') === 'true') {
      setChecked(Boolean(localStorage.getItem('night')));
    }

    if (localStorage.getItem('activeTab')) {
      setActiveTab(localStorage.getItem('activeTab'));
    }

    if (JSON.parse(localStorage.getItem('recycleItems'))?.length) {
      setRecycleItems(JSON.parse(localStorage.getItem('recycleItems')));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items])

  useEffect(() => {
    localStorage.setItem('waitList', JSON.stringify(waitList));
  }, [waitList])
  
  useEffect(() => {
    localStorage.setItem('recycleItems', JSON.stringify(recycleItems));
  }, [recycleItems])
  

  const onCategories = useCallback((c) => {
    setCategories(c);
  }, [])

  const onAdd = (title='', id=null, take=[], pausedays=0) => {
    setItems(items => {
      return [...items, 
              {title: title, shortTitle: title.length > 15 ? title.slice(0, 15) + '...' : title,
                categories: [], take: [...take],
                pauseDate: '',
                lastTakeDate: '',
                activePause: false,
                pauseDays: pausedays,
                id: items[items.length-1]?.id ? items[items.length-1].id + 1 : 1}]
    })

    if (id) {
      setWaitList(waits => {
        return waits.map(wait => {
          if (wait.id === id) {
            return {...wait, amount: wait.amount - 1}
          }
          return wait;
        })
      })
    }
  }

  function onWaitAdd() {
    setWaitList(waits => {
      return [...waits, {title: '', amount: 0,  id: waits[waits.length-1]?.id ? waits[waits.length-1].id + 1 : 1}]
    })
  }

  function onWaitDelete(id) {
    setWaitList(waits => {
      return waits.filter(wait => wait.id !== id);
    })
  }

  function onRecycleDelete(id, type) {
    if (id === 'all') {
      if (type === 'recycle') {
        setRecycleItems(recs => {
          return [];
        })
        return;
      }
      if (type === 'archive') {
        setArchiveItems(recs => {
          return [];
        })
        return;
      }
    }

    if (type === 'recycle') {
      setRecycleItems(recs => {
        return recs.filter(rec => rec.id !== id);
      })
    }
    if (type === 'archive') {
      setArchiveItems(recs => {
        return recs.filter(rec => rec.id !== id);
      })
    }
  } 

  function onCategorieAdd(name, id, itemId) {
    setItems(items => {
      return items.map((item, i) => {
        if (item.id === itemId) {
          let f = false;
          for (let i = 0; i < item.categories.length; i++) {
            if (item.categories[i].name === name) {
              f = true;
              break;
            }
          }
          if (!f) {
            return {...item, categories: [...item.categories, {name: name, id: id}]};
          }
        }
        return item;
      })
    })
  }

  const onTitleChange = (term, id) => {
    setItems(items => {
      return items.map((item, i) => {
        if (item.id === id) {
          return {...item, title: term, shortTitle: term.length > 15 ? term.slice(0, 15) + '...' : term}
        }
        return item;
      })
    })
  }

  function onWaitTitleChange(term, id) {
    setWaitList(waits => {
      return waits.map(wait => {
        if (wait.id === id) {
          return {...wait, title: term}
        }
        return wait;
      })
    })
  }

  function getDate() {
    const d = new Date();
    const lastDate = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
      hours: d.getHours(),
      minutes: d.getMinutes(),
    }


    const day = lastDate.day < 10 ? '0'+lastDate.day : lastDate.day;
    const month = lastDate.month < 10 ? '0'+lastDate.month : lastDate.month;
    const year = lastDate.year+'';
    const hours = lastDate.hours < 10 ? '0'+lastDate.hours : lastDate.hours;
    const minutes = lastDate.minutes < 10 ? '0'+lastDate.minutes : lastDate.minutes;

    const date = day+'-'+month+'-'+year.slice(2)+'T'+hours+':'+minutes;

    return date;
  }

  function getLastCheckDate() {
    const date = getDate();
    localStorage.setItem('lastCheck', date);

    setLastCheck(date);
  }

  function onTools (e, id) {
    const t = e.target;
    if (t.getAttribute('data-take-plus')) {
      addElementToTakeList(1, id);
      getLastCheckDate();
    } 
    else if (t.getAttribute('data-take-minus')) {
        deleteElementFromTakeList(1, id);
        getLastCheckDate();
    }
    else if (t.getAttribute('data-pass-plus')) {
      addElementToTakeList(-1, id);
      getLastCheckDate();
    }
    else if (t.getAttribute('data-pass-minus')) {
        deleteElementFromTakeList(-1, id);
        getLastCheckDate();
    }
  }

  function addAmountToWaitItem(e, id) {
    if (e.target.getAttribute('data-amount-minus')) {
      setWaitList(waits => {
        return waits.map(wait => {
          if (wait.id === id) {
            return {...wait, amount: wait.amount - 1}
          }
          return wait;
        })
      })
    }

    if (e.target.getAttribute('data-amount-plus')) {
      setWaitList(waits => {
        return waits.map(wait => {
          if (wait.id === id) {
            return {...wait, amount: wait.amount + 1}
          }
          return wait;
        })
      })
    }
  }

  function addElementToTakeList(t, id) {
    setItems(items => {
      return items.map((item, i) => {
        if (item.id === id) {
          return {...item, take: item.take.concat([t]), lastTakeDate: getDate()};
        }
        return item;
      })  
    })
  }

  function deleteElementFromTakeList (t, id) {
    setItems(items => {
        return items.map((item, i) => {
          if (item.id === id) {
            const last = item.take.lastIndexOf(t);
            if (last >= 0) {
              return {
                ...item,
                take: item.take.slice(0, last).concat(item.take.slice(last+1, item.take.length))
              }
            }
          }
          return item;
        })
    })
  }

  function deleteCatFromItem(id, itemId) {
    if (id === 'all') {
      if (!itemId) {
        setItems(items => {
          return items.map((item) => {
            return {...item, categories: []};
          })
        })
        return;
      }
      if (itemId) {
        setItems(items => {
          return items.map((item, i) => {
            if (item.id === itemId) {
              return {...item, categories: []};
            } 
            return item;
          })
        })
        return;
      }
    }
    else if (id !== 'all') {
      if (!itemId && itemId !== 0) {
        setItems(items => {
          return items.map(item => {
            for (let i = 0; i < item.categories.length; i++) {
              if (item.categories[i].id === id) {
                return {...item, categories: item.categories.filter((item) => item.id !== id)};
              }
            }
            return item;
          })
        })
        return;
      }
      if (itemId || itemId === 0) {
        setItems(items => {
          return items.map((item, i) => {
            if (item.id === itemId) {
              for (let i = 0; i < item.categories.length; i++) {
                if (item.categories[i].id === id) {
                  return {...item, categories: item.categories.filter((item) => item.id !== id)};
                }
              }
            } 
            return item;
          })
        })
        return
      }
    } 
  } 

  function deleteItem(id, type) {
    const deletedItem = items.filter(item => item.id === id);
    if (deletedItem[0].title.length) {
      if (type === 'recycle') {
        setRecycleItems(recs => {
          return [...recs, {...deletedItem[0], id: recs[recs.length-1]?.id ? recs[recs.length-1]?.id+1 : 1}]
        })
      }
      if (type === 'archive') {
        setArchiveItems(recs => {
          return [...recs, {...deletedItem[0], id: recs[recs.length-1]?.id ? recs[recs.length-1]?.id+1 : 1}]
        })
      }
    }

    const f = items.filter((item, i) => item.id !== id)
    setItems(f);
  }

  function pause(e, id) {
    const d = new Date();
    
    if (!e) {
      const pauseDate = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
        hours: d.getHours(),
        minutes: d.getMinutes(),
        milliseconds: d.getTime()
      }
      
      setItems(items => {
        return items.map((item, i) => {
          if (item.id === id) {
            return {...item, pauseDate, activePause: true}
          }
          return item
        })
      })
    }
    else if (e === 'item') {
      const currentItem = items.filter(item => item.id === id)[0];
      const mil = Date.now() - currentItem.pauseDate.milliseconds;
      const test = Math.floor(3600*1000*24*1)
      const days = Math.floor(mil/1000/3600/24)
      console.log(days)
      // console.log(Math.floor(mil/1000/3600/24)%365)
      if (days > 0) {
        const addArr = []
        for (let i = 0; i < days - currentItem.pauseDays; i++) {
          addArr.push(0)
        }

        setItems(items => {
          return items.map((item, i) => {
            if (item.id === id) {
              return {...item, take: [...item.take, ...addArr], pauseDays: days};
            }
            return item;
          })
        })
      }
    }
    else {
        setItems(items => {
          return items.map((item, i) => {
            if (item.id === id) {
              return {...item, activePause: false, pauseDays: 0}
            }
            return item;
          })
        })    
    }
  }

  function getFilter(f) {
    if (filter === f) {
      setFilter('');
      return;
    }
    setFilter(f);
  }

  function getInitFilter(filter) {
    setInitFilter(filter);
    localStorage.setItem('init', filter);
  }

  function filterItems(arr) {
    if (filter === '') return arr;
    
    return arr.filter(item => {
      for (let i = 0; i < item.categories.length; i++) {
        if (item.categories[i].name === filter) {
          return item;
        }
      } 
      return false;
    })
  }

  function initFilterItems(arr) {
    if (initFilter === 'all') return arr;

    if (initFilter === 'active') {
      return arr.filter(item => !item.activePause);
    }

    if (initFilter === 'pause') {
      return arr.filter(item => item.activePause);
    }
  }

  function getChecked(e) {
    setChecked(e.target.checked);
    if (!e.target.checked) {
      localStorage.setItem('night', '');
    } else {
        localStorage.setItem('night', e.target.checked);
    }
    
  }

  function getActiveTab(tab) {
    setActiveTab(tab);
    window.scrollTo(0, 0);
    localStorage.setItem('activeTab', tab)
  }
  
  const filteredItems = filterItems(initFilterItems(items));
  const amount = {
    'items': filteredItems.length,
    'wait': waitList.length,
    'recycle': recycleItems.length,
    'archive': archiveItems.length
  }
  const itemsTitles = items.map(item => {
    return {title: item.title, id: item.id, activePause: item.activePause};
  })
  const takeItems = filteredItems.map(item => {
    return item.take
  });

  if (checked) {
    document.body.classList.add('night');
  } else {
    document.body.classList.remove('night');
  }

  const tools = {initFilter, getInitFilter, onCategories, deleteCatFromItem, getFilter, filter,
                filteredItems, onAdd, onTitleChange, amount, takeItems, onTools, deleteItem, pause, categories, onCategorieAdd}
  return (
    <div className='App'>
      {lastCheck ? <p className="last_check">{lastCheck}</p> : null}  
        <NightMod checked={checked} getChecked={getChecked}/>
        <Header amount={amount} activeTab={activeTab}/>   
        <QuickMenu itemsTitles={itemsTitles} onTools={onTools} getActiveTab={getActiveTab} activeTab={activeTab}/>
        {activeTab === 'items' ? <ItemsTab {...tools}/> : null}
        {activeTab === 'wait' ?  <WaitSuppList 
                                    waitList={waitList} 
                                    onWaitAdd={onWaitAdd} 
                                    onWaitTitleChange={onWaitTitleChange}
                                    addAmountToWaitItem={addAmountToWaitItem}
                                    onWaitDelete={onWaitDelete}
                                    onAdd={onAdd}/> : null}
        {activeTab === 'recycle' ? <RecycleBin  items={recycleItems} 
                                                onRecycleDelete={onRecycleDelete}
                                                onAdd={onAdd}
                                                type='recycle'/> : null
                                                }
        {activeTab === 'archive' ? <RecycleBin  items={archiveItems} 
                                                onRecycleDelete={onRecycleDelete}
                                                onAdd={onAdd}
                                                type='archive'/> : null
                                                }
    </div>
  );
}

export default App;
