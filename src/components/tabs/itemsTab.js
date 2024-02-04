import { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../header/header';
import ItemList from '../itemList/itemList';
import Categories from '../categories/categories';
import InitFilter from '../initFilter/initFilter';
import QuickMenu from '../quickMenu/quickMenu';
import NightMod from '../nightMod/nightMod';
import WaitSuppList from '../tabs/suppList';

const ItemsTab = () => {
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState('');
    const [initFilter, setInitFilter] = useState('all');
    const [lastCheck, setLastCheck] = useState(localStorage.getItem('lastCheck'));
    const [items, setItems] = useState([
        // {
        //   title: '',
        //   categories: [],
        //   take: [],
        //   pauseDate: '',
        //   activePause: false,
        //   pauseDays: 0,
        //   id: 6
        // }
      ]);

    const onCategories = useCallback((c) => {
        setCategories(c);
        }, [])

    const onAdd = () => {
        setItems(items => {
            return [...items, 
                {title: '', categories: [], take: [],
                    pauseDate: '', 
                    activePause: false,
                    pauseDays: 0,
                    id: items[items.length-1]?.id ? items[items.length-1].id + 1 : 1}]
        })
    }

    function deleteItem(n) {
    
        const f = items.filter((item, i) => i !== n)
        setItems(f);
    }

    function onCategorieAdd(name, id, n) {
        setItems(items => {
          return items.map((item, i) => {
            if (i === n) {
              let f = false;
              for (let i = 0; i < items[n].categories.length; i++) {
                if (items[n].categories[i].name === name) {
                  f = true;
                  break;
                }
              }
              if (!f) {
                return {...item, categories: [...items[n].categories, {name: name, id: id}]};
              }
            }
            return item;
          })
        })
      }

    const onTitleChange = (term, n) => {
        setItems(items => {
          return items.map((item, i) => {
            if (i === n) {
              return {...item, title: term}
            }
            return item;
          })
        })
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

        function getInitFilter(filter) {
        setInitFilter(filter);
        localStorage.setItem('init', filter);
    }

    function deleteCatFromItem(id) {
        if (id === 'all') {
            setItems(items => {
            return items.map((item) => {
                return {...item, categories: []};
            })
            })
            return;
        }
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
    }

    function getLastCheckDate() {
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
        const year = lastDate.year;
        const hours = lastDate.hours < 10 ? '0'+lastDate.hours : lastDate.hours;
        const minutes = lastDate.minutes < 10 ? '0'+lastDate.minutes : lastDate.minutes;
    
        const date = day+'-'+month+'-'+year+'T'+hours+':'+minutes;
    
        localStorage.setItem('lastCheck', date);
    
        setLastCheck(date);
      }

    function onTools (e, n) {
        const t = e.target;
        if (t.getAttribute('data-take-plus')) {
          addElementToTakeList(1, n);
          getLastCheckDate();
        } 
        else if (t.getAttribute('data-take-minus')) {
            deleteElementFromTakeList(1, n);
            getLastCheckDate();
        }
        else if (t.getAttribute('data-pass-plus')) {
          addElementToTakeList(-1, n);
          getLastCheckDate();
        }
        else if (t.getAttribute('data-pass-minus')) {
            deleteElementFromTakeList(-1, n);
            getLastCheckDate();
        }
      }
    
    function addElementToTakeList(t, n) {
    setItems(items => {
        return items.map((item, i) => {
        if (i === n) {
            return {...item, take: item.take.concat([t])};
        }
        return item;
        })  
    })
    }
    
    function deleteElementFromTakeList (t, n) {
        setItems(items => {
            return items.map((item, i) => {
                if (i === n) {
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

        function pause(e, n) {
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
                if (i === n) {
                return {...item, pauseDate, activePause: true}
                }
                return item
            })
            })
        }
        else if (e === 'item') {
            const mil = Date.now() - items[n].pauseDate.milliseconds;
            const test = Math.floor(3600*1000*24*1)
            const days = Math.floor(mil/1000/3600/24)%365
            // console.log(Math.floor(mil/1000/3600/24)%365)
            if (days > 0) {
            const addArr = []
            for (let i = 0; i < days - items[n].pauseDays; i++) {
                addArr.push(0)
            }

            setItems(items => {
                return items.map((item, i) => {
                if (i === n) {
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
                if (i === n) {
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

    const takeItems = items.map(item => {
        return item.take
      });
    const filteredItems = filterItems(initFilterItems(items));
    const amount = filteredItems.length;
    return (
        <div className='items_tab'>
            <InitFilter initFilter={initFilter} getInitFilter={getInitFilter}/>
            <Categories 
                onCategories={onCategories} 
                deleteCatFromItem={deleteCatFromItem} 
                getFilter={getFilter}
                filter={filter}/>
            <ItemList 
                items={filteredItems} 
                onAdd={onAdd} 
                onTitleChange={onTitleChange} 
                amount={amount}
                takeItems={takeItems}
                onTools={onTools}
                deleteItem={deleteItem}
                pause={pause}
                categoriesList={categories}
                onCategorieAdd={onCategorieAdd}
                deleteCatFromItem={deleteCatFromItem}/>
        </div>
    )
}

export default ItemsTab;