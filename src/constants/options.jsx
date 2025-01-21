export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈️',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A Group of fun loving adv',
        icon: '🏡',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill seekers',
        icon: '🚃',
        people: '5 to 7 People'
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay concious of costs',
        icon: '💵',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'keep cost on the average side',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'No issues with the cost',
        icon: '💸',
    },
]

export const AI_PROMPT = 'Generate Travel Plan for Location: {destination}, for {totalDays} for {traveler} with a {budget}, give me Hotels options list with HotelName, Hotel address, price, real working hotel image valid url , geo coordinates, rating , description and suggestions, time travel each of the location for {totalDays} days with each day field must have a day wise plan field value like where to go and what to do with best time to visit in time range hh:mm format, in JSON format';