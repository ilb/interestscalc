## Functions

<dl>
<dt><a href="#convertDate">convertDate(date)</a> ⇒ <code>Date</code></dt>
<dd><p>Преобразование даты из строки YYYY-MM-DD или timestamp в дату</p>
</dd>
<dt><a href="#convertTimestamp">convertTimestamp(date)</a> ⇒ <code>Date</code></dt>
<dd><p>Преобразование даты из строки YYYY-MM-DD или Date в unix timestamp</p>
</dd>
<dt><a href="#checkPeriod">checkPeriod(begDate, endDate)</a></dt>
<dd><p>Проверка периода</p>
</dd>
<dt><a href="#filterMap">filterMap(begDate, endDate, map)</a></dt>
<dd><p>Чистка массива по периоду: если дата значения</p>
</dd>
<dt><a href="#convertMap">convertMap(obj, keyMapper, valueMapper)</a> ⇒ <code>Map</code></dt>
<dd><p>Преобразование объекта в map</p>
</dd>
<dt><a href="#uniqueDates">uniqueDates(dates)</a> ⇒ <code>Array</code></dt>
<dd><p>Получить уникальные даты из массива</p>
</dd>
<dt><a href="#daysOfYear">daysOfYear(year)</a> ⇒ <code>number</code></dt>
<dd><p>Количество дней в году</p>
</dd>
<dt><a href="#isLeapYear">isLeapYear(year)</a> ⇒ <code>boolean</code></dt>
<dd><p>Является ли год високосным</p>
</dd>
<dt><a href="#calcInterestsTotal">calcInterestsTotal(begDate, endDate)</a></dt>
<dd><p>Расчет итого %% за период.</p>
</dd>
<dt><a href="#calcInterests">calcInterests(begDate, endDate)</a></dt>
<dd><p>Расчет процентной ведомости за период.</p>
</dd>
<dt><a href="#accruedInterestDates">accruedInterestDates(begDate, endDate)</a> ⇒ <code>array</code></dt>
<dd><p>Даты начислений %%</p>
</dd>
<dt><a href="#getConstPeriods">getConstPeriods(balances, rates)</a></dt>
<dd><p>Получить периоды постоянства остатка и ставки</p>
</dd>
<dt><a href="#firstDayOfNextOfMonth">firstDayOfNextOfMonth(date)</a> ⇒ <code>Date</code></dt>
<dd><p>Первый день следуюшего месяца.</p>
</dd>
<dt><a href="#dates">dates()</a></dt>
<dd><p>Список дат, на которые заведены значения</p>
</dd>
<dt><a href="#get">get(date)</a></dt>
<dd><p>Получить значение на дату</p>
</dd>
</dl>

<a name="convertDate"></a>

## convertDate(date) ⇒ <code>Date</code>
Преобразование даты из строки YYYY-MM-DD или timestamp в дату

**Kind**: global function  

| Param | Type |
| --- | --- |
| date | <code>\*</code> | 

<a name="convertTimestamp"></a>

## convertTimestamp(date) ⇒ <code>Date</code>
Преобразование даты из строки YYYY-MM-DD или Date в unix timestamp

**Kind**: global function  

| Param | Type |
| --- | --- |
| date | <code>\*</code> | 

<a name="checkPeriod"></a>

## checkPeriod(begDate, endDate)
Проверка периода

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| begDate | <code>Date</code> | дата начала периода |
| endDate | <code>Date</code> | дата окончания периода |

<a name="filterMap"></a>

## filterMap(begDate, endDate, map)
Чистка массива по периоду: если дата значения

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| begDate | <code>Date</code> | дата начала периода |
| endDate | <code>Date</code> | дата окончания периода |
| map | <code>Map</code> | значения (дата->значение), отсортированные по дате |

<a name="convertMap"></a>

## convertMap(obj, keyMapper, valueMapper) ⇒ <code>Map</code>
Преобразование объекта в map

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | входной объект |
| keyMapper | <code>function</code> | опциональная функция преобразования ключа |
| valueMapper | <code>\*</code> | опциональная функция преобразования значения |

<a name="uniqueDates"></a>

## uniqueDates(dates) ⇒ <code>Array</code>
Получить уникальные даты из массива

**Kind**: global function  
**Returns**: <code>Array</code> - массив уникальных дат  

| Param | Type | Description |
| --- | --- | --- |
| dates | <code>Array</code> | массив дат |

<a name="daysOfYear"></a>

## daysOfYear(year) ⇒ <code>number</code>
Количество дней в году

**Kind**: global function  

| Param | Type |
| --- | --- |
| year | <code>number</code> | 

<a name="isLeapYear"></a>

## isLeapYear(year) ⇒ <code>boolean</code>
Является ли год високосным

**Kind**: global function  

| Param | Type |
| --- | --- |
| year | <code>number</code> | 

<a name="calcInterestsTotal"></a>

## calcInterestsTotal(begDate, endDate)
Расчет итого %% за период.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| begDate | <code>Date</code> | дата начала периода |
| endDate | <code>Date</code> | дата окончания периода |

<a name="calcInterests"></a>

## calcInterests(begDate, endDate)
Расчет процентной ведомости за период.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| begDate | <code>Date</code> | дата начала периода |
| endDate | <code>Date</code> | дата окончания периода |

<a name="accruedInterestDates"></a>

## accruedInterestDates(begDate, endDate) ⇒ <code>array</code>
Даты начислений %%

**Kind**: global function  
**Returns**: <code>array</code> - список дат для разбивки начислений %% по месяцам  

| Param | Type |
| --- | --- |
| begDate | <code>Date</code> | 
| endDate | <code>Date</code> | 

<a name="getConstPeriods"></a>

## getConstPeriods(balances, rates)
Получить периоды постоянства остатка и ставки

**Kind**: global function  

| Param | Type |
| --- | --- |
| balances | <code>Map</code> | 
| rates | <code>Map</code> | 

<a name="firstDayOfNextOfMonth"></a>

## firstDayOfNextOfMonth(date) ⇒ <code>Date</code>
Первый день следуюшего месяца.

**Kind**: global function  
**Returns**: <code>Date</code> - Первый день следуюшего месяца  

| Param | Type |
| --- | --- |
| date | <code>Date</code> | 

<a name="dates"></a>

## dates()
Список дат, на которые заведены значения

**Kind**: global function  
<a name="get"></a>

## get(date)
Получить значение на дату

**Kind**: global function  

| Param | Type |
| --- | --- |
| date | <code>Date</code> | 

