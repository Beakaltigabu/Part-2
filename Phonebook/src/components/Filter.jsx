const Filter=({value, onChange, filteredPersons})=>(
<div>
    filter shown with:
    <input value={value} onChange={onChange} />

    {filteredPersons.length>0 ? (filteredPersons.map(person=>(
        <p key={person.id}>
            {person.name} - {person.number}
        </p>
    ))):(
        value && <p>No Matches Found</p>
    )
    }

</div>
)

export default Filter
