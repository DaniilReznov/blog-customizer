import { FormEvent, useRef, useState } from 'react';
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
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onSubmit: (formState: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ onSubmit }: ArticleParamsFormProps) => {
  const [formState, setFormState] = useState(defaultArticleState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);
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

  useOutsideClickClose({
    isOpen: isMenuOpen,
    rootRef: asideRef,
    onChange: setIsMenuOpen,
  });

  return (
    <>
      <ArrowButton
        isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      <aside
        ref={asideRef}
        className={clsx(styles.container, {
          [styles.container_open]: isMenuOpen,
        })}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Text as='h2' size={31} weight={800} align='left' uppercase>
            Задайте параметры
          </Text>
          <Select
            selected={formState.fontFamilyOption}
            onChange={handleOptionChange('fontFamilyOption')}
            options={fontFamilyOptions}
            title='Шрифт'
          />
          <RadioGroup
            selected={formState.fontSizeOption}
            name='radio'
            onChange={handleOptionChange('fontSizeOption')}
            options={fontSizeOptions}
            title='Размер шрифта'
          />
          <Select
            selected={formState.fontColor}
            onChange={handleOptionChange('fontColor')}
            options={fontColors}
            title='Цвет шрифта'
          />
          <Separator />
          <Select
            selected={formState.backgroundColor}
            onChange={handleOptionChange('backgroundColor')}
            options={backgroundColors}
            title='Цвет фона'
          />
          <Select
            selected={formState.contentWidth}
            onChange={handleOptionChange('contentWidth')}
            options={contentWidthArr}
            title='Ширина контента'
          />
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
