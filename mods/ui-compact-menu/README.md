![](./banner.jpg)

Reduce construction menu scrolling with better grouping of entries.

## Tabs

- Consumables tab is split into Farmer to Investor and Scholar, Tourist and Skyscraper tab
- Culture tab is merged into City and Public Services tab

## Groups

### Citys Tab Groups

- Marketplace: vanilla, Pescatarian community center
- Religion: Lion053's chapels, church, Pescatarian community center
- Education: school, library, music school, university
- Tourists: public mooring, bus stop, hotel, small hotel, restaurant, cafe, bar, iron tower
- Malls: department store, furniture store, drug store
- Culture: zoo, museum, botanical garden, world fair

### Public Services Groups

- Tourists: public mooring, bus stop, hotel, small hotel, restaurant, cafe, bar, iron tower
- Institutions: fire station, police, hospital
- Administration: guild house, harbour master, town hall
- Electricity: vanilla, river power plant, small power plants

### Harbour Groups

- Harbour guns: all vanilla harbour weapons

## Notes

This mod does not recreate the whole menu, but only combines what is correctly added.
Some mods add their icon only to either progression type sorting or category type sorting.
Please contact the respective mod authors for fixes.

Contact me if you have any mod conflicts so that I can take care of them.

## Modders

Add `City` or `Secondary` if you want to change where your building is added to.
The changes are applied with `LoadAfterIds: '*'`.
Avoid adding your building in that loading stage, otherwise contact me to add a dependency.

Merge culture building into City tab instead of Public Services tab:

```xml
<ConstructionCategory>
  <BuildingList>
    <Item>
      <Building>123</Building>
      <City>1</City>
    </Item>
  </BuildingList>
</ConstructionCategory>
```

Merge Consumable building into Tourist, Skyscraper, Scholar tab:

```xml
<ConstructionCategory>
  <BuildingList>
    <Item>
      <Building>123</Building>
      <Secondary>1</CSecondaryity>
    </Item>
  </BuildingList>
</ConstructionCategory>
```

## Changes

### 2.0

- Split Consumables into vanilla tiers and DLC tiers
- Merge Culture tab into City and Public Services
- Group OW electricity, education and religion, culture buildings

## Credits

Thanks to darknesswei, DrD_AVEL, modpark817 for the translations!
