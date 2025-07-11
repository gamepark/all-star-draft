import { LocationStrategy, Material, MaterialItem } from '@gamepark/rules-api'

export class MultipleListStrategy<P extends number = number, M extends number = number, L extends number = number> implements LocationStrategy<P, M, L> {
  public addItem(material: Material<P, M, L>, item: MaterialItem<P, L>): void {
    if (item.location.id === undefined || item.location.id === null) {
      throw new Error('Invalid location id')
    }
    if (item.location.x === undefined) {
      item.location.x = material.locationId(item.location.id).length
    } else {
      material
        .locationId(item.location.id)
        .getItems()
        .forEach((it) => {
          const itemX = it.location.x
          if (itemX !== undefined && itemX >= item.location.x!) {
            it.location.x!++
          }
        })
    }
  }

  public moveItem(material: Material<P, M, L>, item: MaterialItem<P, L>, index: number): void {
    if (item.location.id === undefined || item.location.id === null) {
      throw new Error('Invalid location id')
    }
    if (item.location.x === undefined) {
      item.location.x = material.locationId(item.location.id).length - 1
    }
    const x = material.getItem(index).location.x
    if (x === undefined) {
      return
    }
    const newX = item.location.x
    if (x < newX) {
      material
        .locationId(item.location.id)
        .getItems()
        .forEach((it) => {
          const itemX = it.location.x
          if (itemX !== undefined && itemX >= x && itemX <= newX) {
            it.location.x!--
          }
        })
    } else if (x > newX) {
      material
        .locationId(item.location.id)
        .getItems()
        .forEach((it) => {
          const itemX = it.location.x
          if (itemX !== undefined && itemX >= newX && itemX < x) {
            it.location.x!++
          }
        })
    }
  }

  public removeItem(material: Material<P, M, L>, item: MaterialItem<P, L>): void {
    if (item.location.id === undefined || item.location.id === null) {
      throw new Error('Invalid location id')
    }
    const x = item.location.x
    if (x === undefined) {
      return
    }
    material
      .locationId(item.location.id)
      .getItems()
      .forEach((it) => {
        const itemX = it.location.x
        if (itemX !== undefined && itemX > x) {
          it.location.x!--
        }
      })
  }
}
