import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SortingDefinition} from '../../dto/sorting-definition';
import {SortingModel} from '../../dto/sorting-model';

enum SortingDirection {
    none = 'none',
    up = 'up',
    down = 'down'
}

@Component({
    selector: 'app-sorting',
    templateUrl: './sorting.component.html',
    styleUrls: ['./sorting.component.scss']
})
export class SortingComponent {

    readonly DIRECTION_NONE = 'none';
    readonly DIRECTION_UP = 'up';
    readonly DIRECTION_DOWN = 'down';

    @Input()
    sortingDefinitions: SortingDefinition[];

    @Input()
    sortingModel: SortingModel;

    @Output()
    sortingModelChange = new EventEmitter<SortingModel>();

    onClick(sortingDefinition: SortingDefinition): void {
        if (this.isActive(sortingDefinition)) {
            this.sortingModelChange.next({key: sortingDefinition.key, reverse: !this.sortingModel.reverse});
        } else {
            this.sortingModelChange.next({key: sortingDefinition.key, reverse: sortingDefinition.reverse});
        }
    }

    isActive(sortingDefinition: SortingDefinition): boolean {
        return sortingDefinition.key === this.sortingModel.key;
    }

    getSortingDirection(sortingDefinition: SortingDefinition): boolean {
        if (this.isActive(sortingDefinition)) {
            return !this.sortingModel.reverse;
        } else {
            return null;
        }
    }

}
