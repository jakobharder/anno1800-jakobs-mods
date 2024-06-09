![](./banner.jpg)

Combine city construction menu icons into categories: tourists, public services, institutions, malls and administration.

## Notes

This mod does not recreate the whole menu, but only combines what is correctly added.
Some mods add their icon only to either progression type sorting or category type sorting.
Please contact the respective mod authors for fixes.

Buildings from Muggenstuermer and Xan are included.

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

### 1.3

- 1.3.1: Updated Korean translations (thanks to modpark817)
- Swapped NW warehouse and residence to be consistent with OW

## Credits

Thanks to darknesswei, DrD_AVEL, modpark817 for the translations!
