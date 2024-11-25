import { FormEvent, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
  fontSizeOptions,
  contentWidthArr,
  backgroundColors,
  fontColors,
  fontFamilyOptions,
  defaultArticleState,
  OptionType,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onSubmit: (formState: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ onSubmit }: ArticleParamsFormProps) => {
  const [formState, setFormState] = useState(defaultArticleState);
  const [isOpen, setClose] = useState(false);
  const handleReset = () => {
    setFormState(defaultArticleState);
    onSubmit(defaultArticleState);
  };

  const handleOptionChange = (name: string) => (option: OptionType) => {
    setFormState({ ...formState, [name]: option });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(formState);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setClose(!isOpen)} />
      <aside
        className={`${styles.container} ${
          isOpen ? styles.container_open : ''
        }`}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Text as='h2' size={31} weight={800} align='left' uppercase>
            Задайте параметры
          </Text>
          <div>
            <Select
              selected={formState.fontFamilyOption}
              onChange={handleOptionChange('fontFamilyOption')}
              options={fontFamilyOptions}
              title='Шрифт'
            />
          </div>
          <div>
            <RadioGroup
              selected={formState.fontSizeOption}
              name='radio'
              onChange={handleOptionChange('fontSizeOption')}
              options={fontSizeOptions}
              title='Размер шрифта'
            />
          </div>
          <div>
            <Select
              selected={formState.fontColor}
              onChange={handleOptionChange('fontColor')}
              options={fontColors}
              title='Цвет шрифта'
            />
          </div>
          <Separator />
          <div>
            <Select
              selected={formState.backgroundColor}
              onChange={handleOptionChange('backgroundColor')}
              options={backgroundColors}
              title='Цвет фона'
            />
          </div>
          <div>
            <Select
              selected={formState.contentWidth}
              onChange={handleOptionChange('contentWidth')}
              options={contentWidthArr}
              title='Ширина контента'
            />
          </div>
          <div className={styles.bottomContainer}>
            <Button
              title='Сбросить'
              htmlType='reset'
              type='clear'
              onClick={handleReset}
            />
            <Button title='Применить' htmlType='submit' type='apply' />
          </div>
        </form>
      </aside>
    </>
  );
};
